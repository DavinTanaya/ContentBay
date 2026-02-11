import { AuthService } from "../../services/auth.service";

export const authResolvers = {
  Mutation: {
    googleLogin: (
      _: unknown,
      args: { idToken: string }
    ) => {
      return AuthService.loginWithGoogle(args.idToken);
    },
  },
};
