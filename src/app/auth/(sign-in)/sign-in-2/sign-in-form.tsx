'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import { logIn } from '@/api-handler/api';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const initialValues: LoginSchema = {
  email: '',
  password: '',
};

export default function SignInForm() {
  const router = useRouter();
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setIsLoading] = useState(false);
  const handleRememberChange = () => {
    setRememberMe(!rememberMe);
  };

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      setIsLoading(true);
      const { email, password } = data;

      const formData = {
        email,
        password,
      };

      const response = await logIn(formData);
      localStorage.setItem('token', response?.data?.token);
      toast.success('Sign in successfully!', {
        duration: 5000,
      });
      console.log(response);
      if (response?.data?.result?.isOutletCreated === 1) {
        router.push('/');
        setIsLoading(false);
      } else {
        router.push('/business-info/add-business');
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Registration failed!', {
        duration: 2000,
      });
      setIsLoading(false);
      console.error('Registration failed:', error);
    }
  };
  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                checked={rememberMe}
                onChange={handleRememberChange}
                label="Remember Me"
                color="info"
                variant="flat"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.auth.forgotPassword2}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            <Button
              className="w-full border-2 border-primary-light text-base font-medium"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill"
              disabled={loading}
            >
              {loading ? (
                <div
                  style={{
                    display: 'inline-block',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #3498db',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px',
                  }}
                />
              ) : (
                'Sign in'
              )}
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp2}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Create Account
        </Link>
      </Text>
    </>
  );
}
