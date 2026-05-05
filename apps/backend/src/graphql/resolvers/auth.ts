import { AuthService } from '../../services/auth.service'
import { Context } from '../../context'

interface RegisterArgs {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface LoginArgs {
  email: string
  password: string
}

interface GoogleLoginArgs {
  idToken: string
}

interface GoogleAccessTokenArgs {
  accessToken: string
}

export const authResolvers = {
  Query: {
    users: (_: unknown, __: unknown, ctx: Context) => {
      return ctx.prisma.user.findMany({
        orderBy: { id: 'asc' },
      })
    },
  },
  Mutation: {
    register: (_: unknown, args: RegisterArgs) => {
      return AuthService.register(
        args.firstName,
        args.lastName,
        args.email,
        args.password,
      )
    },

    login: (_: unknown, args: LoginArgs) => {
      return AuthService.login(args.email, args.password)
    },

    googleLogin: (_: unknown, args: GoogleLoginArgs) => {
      return AuthService.loginWithGoogle(args.idToken)
    },

    googleLoginWithAccessToken: (_: unknown, args: GoogleAccessTokenArgs) => {
      return AuthService.loginWithGoogleAccessToken(args.accessToken)
    },
  },
}
