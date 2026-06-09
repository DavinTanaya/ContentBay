import { gql } from '@apollo/client';

export const CREATE_CONTENT_MODEL = gql`
  mutation CreateContentModel($input: CreateContentModelInput!) {
    createContentModel(input: $input) {
      id
      workspaceId
      name
      apiId
      description
      icon
      status
      createdAt
      updatedAt
      createdBy
      updatedBy
    }
  }
`;

export const UPDATE_CONTENT_MODEL = gql`
  mutation UpdateContentModel($id: ID!, $input: CreateContentModelInput!) {
    updateContentModel(id: $id, input: $input) {
      id
      workspaceId
      name
      apiId
      description
      icon
      status
      fields {
        id
        name
        type
        apiId
        icon
        localized
        required
        isTitle
        description
        validations
        appearance
        defaultValue
        settings
      }
      createdAt
      updatedAt
      createdBy
      updatedBy
    }
  }
`;

export const DELETE_CONTENT_MODEL = gql`
  mutation DeleteContentModel($id: ID!) {
    deleteContentModel(id: $id)
  }
`;

export const GENERATE_AI_MODELS = gql`
  mutation GenerateAIModels($workspaceId: String!, $prompt: String!, $history: [AIChatMessageInput!]) {
    generateAIModels(workspaceId: $workspaceId, prompt: $prompt, history: $history) {
      success
      message
      models {
        name
        apiId
        description
        icon
        fields {
          name
          apiId
          type
          required
          isTitle
          description
        }
      }
      sdkCode
    }
  }
`;
