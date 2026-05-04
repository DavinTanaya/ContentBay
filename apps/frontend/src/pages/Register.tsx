import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../auth/AuthContext";
import {
  register as registerUser,
  loginWithGoogleAccessToken,
} from "../auth/auth.service";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function Register() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) navigate("/", { replace: true });
  }, [auth.isAuthenticated, navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!agreedTerms) {
      setError("You must agree to the Terms of Use and Privacy Policy");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await registerUser(firstName, lastName, email, password);
      auth.login(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = await loginWithGoogleAccessToken(tokenResponse.access_token);
        auth.login(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Google signup failed");
      }
    },
    onError: () => setError("Google signup failed"),
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:block lg:w-[30%] relative">
        <img src="/auth/login.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-blue-600/40" />
      </div>

      <div className="flex w-full flex-col overflow-y-auto bg-gray-50 lg:w-[70%]">
        <div className="px-10 pt-8 lg:px-16">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded bg-blue-500" />
            <span className="text-lg font-bold text-gray-900">ContentBay</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-10 py-8 lg:px-16">
          <div className="w-full max-w-[440px]">
            <div className="rounded-2xl border border-gray-200 bg-white px-10 py-10">
              <h1 className="text-center text-[28px] font-bold text-gray-900">Create an account</h1>

              {error && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
              )}

              <form onSubmit={onSubmit} className="mt-7 space-y-4">
                <div>
                  <label htmlFor="reg-firstname" className="mb-1 block text-[13px] font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="reg-firstname"
                    type="text"
                    placeholder="example"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="reg-lastname" className="mb-1 block text-[13px] font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="reg-lastname"
                    type="text"
                    placeholder="example"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="reg-email" className="mb-1 block text-[13px] font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="reg-password" className="mb-1 block text-[13px] font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="reg-password"
                      type={showPw ? "text" : "password"}
                      placeholder="Input password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full rounded-md border border-gray-300 px-3.5 py-2 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Toggle password"
                    >
                      {showPw ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-[13px] leading-snug text-gray-600">
                    By creating an account, I agree to our{" "}
                    <a href="#" className="font-medium text-gray-900 underline">Terms of use</a> and{" "}
                    <a href="#" className="font-medium text-gray-900 underline">Privacy Policy</a>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 rounded-md bg-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 disabled:opacity-60"
                >
                  {loading ? "Creating…" : "Create an account"}
                </button>
              </form>

              <div className="my-5 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => googleLogin()}
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <GoogleIcon /> Sign up with Google
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <GithubIcon /> Sign up with Github
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <FacebookIcon /> Sign up with Facebook
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-500 hover:text-blue-600">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
