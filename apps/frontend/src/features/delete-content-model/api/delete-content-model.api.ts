import { gql } from '@apollo/client';

export const DELETE_CONTENT_MODEL = gql`
  mutation DeleteContentModel($id: ID!) {
    deleteContentModel(id: $id)
  }
`;
