// features/auth/components/LoginForm.tsx
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import GoogleIcon from './GoogleIcon';
import GithubIcon from './GithubIcon';
import FacebookIcon from './FacebookIcon';

export const LoginForm = () => {
  const { onFinish, googleLogin } = useLogin();

  return (
    <div className="w-full max-w-110">
      <div className="rounded-2xl border border-gray-5 bg-white px-8 py-7">
        <h3 className="text-center h3-bold">Welcome back</h3>
        <p className="mt-1 text-center text-sm text-gray-7">
          Log in to your ContentBay account
        </p>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="mt-5"
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input placeholder="example@gmail.com" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password placeholder="Input password" size="large" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="unchecked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Login
            </Button>
          </Form.Item>
        </Form>
        <Divider plain>Or</Divider>
        <div className="space-y-2.5 w-full">
          <Button
            shape="round"
            icon={<GoogleIcon />}
            size="large"
            onClick={() => googleLogin()}
            className="w-full"
          >
            Continue with Google
          </Button>
          <Button
            shape="round"
            icon={<GithubIcon />}
            size="large"
            className="w-full"
          >
            Continue with Github
          </Button>
          <Button
            shape="round"
            icon={<FacebookIcon />}
            size="large"
            className="w-full"
          >
            Continue with Facebook
          </Button>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-blue-500 hover:text-blue-600"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};
