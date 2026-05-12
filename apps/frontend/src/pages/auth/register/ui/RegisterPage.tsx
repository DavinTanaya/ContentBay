import { RegisterForm } from '@features/auth/components/RegisterForm';
import { AuthLayout } from '@layout/auth/AuthLayout';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
