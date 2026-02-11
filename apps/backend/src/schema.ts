import { createSchema } from 'graphql-yoga'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const typeDefs = `
  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    googleLogin(idToken: String!): AuthPayload!
    createDraft(data: PostCreateInput!): Post
    deletePost(id: Int!): Post
    incrementPostViewCount(id: Int!): Post
    togglePublishPost(id: Int!): Post
  }

  type Post {
    author: User
    content: String
    createdAt: DateTime!
    id: Int!
    published: Boolean!
    title: String!
    updatedAt: DateTime!
    viewCount: Int!
  }

  input PostCreateInput {
    content: String
    title: String!
  }

  input PostOrderByUpdatedAtInput {
    updatedAt: SortOrder!
  }

  type Query {
    allUsers: [User!]!
    draftsByUser(userUniqueInput: UserUniqueInput!): [Post]
    feed(
      orderBy: PostOrderByUpdatedAtInput
      searchString: String
      skip: Int
      take: Int
    ): [Post!]!
    postById(id: Int): Post
  }

  enum SortOrder {
    asc
    desc
  }

  type User {
    id: Int!
    email: String!
    name: String
    picture: String
    provider: String!
    createdAt: DateTime!
    posts: [Post!]!
  }


  input UserCreateInput {
    email: String!
    name: String
    posts: [PostCreateInput!]
  }

  input UserUniqueInput {
    email: String
    id: Int
  }

  scalar DateTime
`

export const resolvers = {
  Query: {
    allUsers: (_parent, _args, context: Context) => {
      return context.prisma.user.findMany()
    },
    postById: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.post.findUnique({
        where: { id: args.id || undefined },
      })
    },
    feed: (
      _parent,
      args: {
        searchString: string
        skip: number
        take: number
        orderBy: PostOrderByUpdatedAtInput
      },
      context: Context,
    ) => {
      const or = args.searchString
        ? {
            OR: [
              { title: { contains: args.searchString } },
              { content: { contains: args.searchString } },
            ],
          }
        : {}

      return context.prisma.post.findMany({
        where: {
          published: true,
          ...or,
        },
        take: args?.take,
        skip: args?.skip,
        orderBy: args?.orderBy,
      })
    },
    draftsByUser: (
      _parent,
      args: { userUniqueInput: UserUniqueInput },
      context: Context,
    ) => {
      return context.prisma.post.findMany({
        where: {
          published: false,
          author: {
            id: args.userUniqueInput.id || undefined,
            email: args.userUniqueInput.email || undefined,
          },
        },
      })
    },
  },
  Mutation: {
    googleLogin: async (
      _parent,
      args: { idToken: string },
      context: Context,
    ) => {
      const ticket = await googleClient.verifyIdToken({
        idToken: args.idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload()

      if (!payload?.email) {
        throw new Error('Invalid Google token')
      }

      let user = await context.prisma.user.findUnique({
        where: { email: payload.email },
      })

      if (!user) {
        user = await context.prisma.user.create({
          data: {
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
            provider: 'google',
          },
        })
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '7d',
      })

      return { token, user }
    },
    createDraft: (
      _parent,
      args: { data: PostCreateInput },
      context: Context,
    ) => {
      if (!context.userId) {
        throw new Error('Not authenticated')
      }
      return context.prisma.post.create({
        data: {
          title: args.data.title,
          content: args.data.content,
          author: {
            connect: { id: context.userId },
          },
        },
      })
    },
    togglePublishPost: async (
      _parent,
      args: { id: number },
      context: Context,
    ) => {
      try {
        const post = await context.prisma.post.findUnique({
          where: { id: args.id || undefined },
          select: {
            published: true,
          },
        })

        return context.prisma.post.update({
          where: { id: args.id || undefined },
          data: { published: !post?.published },
        })
      } catch (error) {
        throw new Error(
          `Post with ID ${args.id} does not exist in the database.`,
        )
      }
    },
    incrementPostViewCount: (
      _parent,
      args: { id: number },
      context: Context,
    ) => {
      return context.prisma.post.update({
        where: { id: args.id || undefined },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      })
    },
    deletePost: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.post.delete({
        where: { id: args.id },
      })
    },
  },
  DateTime: DateTimeResolver,
  Post: {
    author: async (parent, _args, context: Context) => {
      const post = await context.prisma.post.findUnique({
        where: { id: parent?.id },
        include: {
          author: true,
        },
      })
      return post?.author
    },
  },
  User: {
    posts: (parent, _args, context: Context) => {
      return context.prisma.post.findMany({
        where: {
          author: parent.id || undefined,
        },
        include: {
          author: true,
        },
      })
    },
  },
}

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

interface PostOrderByUpdatedAtInput {
  updatedAt: SortOrder
}

interface UserUniqueInput {
  id?: number
  email?: string
}

interface PostCreateInput {
  title: string
  content?: string
}

interface UserCreateInput {
  email: string
  name?: string
  posts?: PostCreateInput[]
}

export const schema = createSchema({
  typeDefs,
  resolvers,
})
