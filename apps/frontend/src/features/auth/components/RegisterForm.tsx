// features/auth/components/RegisterForm.tsx
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import GoogleIcon from './GoogleIcon';
import GithubIcon from './GithubIcon';
import FacebookIcon from './FacebookIcon';

export const RegisterForm = () => {
  const { onFinish, googleLogin } = useRegister();

  return (
    <div className="w-full max-w-110">
      <div className="rounded-2xl border border-gray-5 bg-white px-8 py-7">
        <h3 className="text-center h3-bold">Create your account</h3>
        <p className="mt-1 text-center text-sm text-gray-7 mb-4">
          Join ContentBay and start sharing your content
        </p>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'First name is required' }]}
          >
            <Input placeholder="John" size="large" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Last name is required' }]}
          >
            <Input placeholder="Doe" size="large" />
          </Form.Item>

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
            rules={[
              { required: true, message: 'Password is required' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password placeholder="Create a password" size="large" />
          </Form.Item>

          <Form.Item
            name="agreedTerms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          'You must agree to the Terms of Use and Privacy Policy',
                        ),
                      ),
              },
            ]}
          >
            <Checkbox>
              I agree to the{' '}
              <a href="#" className="text-blue-500 hover:text-blue-600">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-500 hover:text-blue-600">
                Privacy Policy
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Sign up
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
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-blue-500 hover:text-blue-600"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};
