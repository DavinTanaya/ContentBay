import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  LocalStateError,
  ServerError,
  ServerParseError,
  UnconventionalError,
} from '@apollo/client/errors';

export const ApolloErrorUtils = {
  isGraphQL: CombinedGraphQLErrors.is,
  isServer: ServerError.is,
  isParse: ServerParseError.is,
  isProtocol: CombinedProtocolErrors.is,
  isLocal: LocalStateError.is,
  isUnconventional: UnconventionalError.is,
};
