import { googleClient } from "../lib/google";
import { signToken } from "../lib/jwt";
import { UserRepository } from "../repositories/user.repo";

export class AuthService {
  static async loginWithGoogle(idToken: string) {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      throw new Error("Invalid Google token");
    }

    let user = await UserRepository.findByEmail(payload.email);

    if (!user) {
      user = await UserRepository.create({
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        provider: "google",
      });
    }

    const token = signToken(user.id);

    return { token, user };
  }
}
