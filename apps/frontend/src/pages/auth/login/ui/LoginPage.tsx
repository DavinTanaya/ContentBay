import { LoginForm } from '@features/auth/components/LoginForm';
import { AuthLayout } from '@layout/auth/AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
