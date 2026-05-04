import bcrypt from "bcryptjs";

import { googleClient } from "../lib/google";
import { signToken } from "../lib/jwt";
import { UserRepository } from "../repositories/user.repo";

const SALT_ROUNDS = 10;

export class AuthService {
  /**
   * Register a new user with email and password.
   * Throws if the email is already taken.
   */
  static async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const existing = await UserRepository.findByEmail(email);

    if (existing) {
      throw new Error("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await UserRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      provider: "local",
    });

    const token = signToken(user.id);

    return { token, user };
  }

  /**
   * Log in with email and password.
   * Throws if credentials are invalid.
   */
  static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user || !user.password) {
      throw new Error("Invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    const token = signToken(user.id);

    return { token, user };
  }

  /**
   * Log in (or auto-register) with a Google ID token.
   * Used by Google One-Tap / credential flow.
   */
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
        firstName: payload.given_name,
        lastName: payload.family_name,
        picture: payload.picture,
        provider: "google",
      });
    }

    const token = signToken(user.id);

    return { token, user };
  }

  /**
   * Log in (or auto-register) with a Google access token.
   * Used by the popup-based OAuth flow (useGoogleLogin).
   */
  static async loginWithGoogleAccessToken(accessToken: string) {
    const res = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    if (!res.ok) {
      throw new Error("Invalid Google access token");
    }

    const profile = await res.json();

    if (!profile.email) {
      throw new Error("Could not retrieve email from Google");
    }

    let user = await UserRepository.findByEmail(profile.email);

    if (!user) {
      user = await UserRepository.create({
        email: profile.email,
        firstName: profile.given_name,
        lastName: profile.family_name,
        picture: profile.picture,
        provider: "google",
      });
    }

    const token = signToken(user.id);

    return { token, user };
  }
}
