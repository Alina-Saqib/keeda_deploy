'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMedia } from '@/hooks/use-media';
import { Text } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { signUp } from '@/api-handler/api';
import { SignUpSchema, signUpSchema } from '@/utils/validators/signup.schema';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const initialValues = {
  email: '',
  password: '',
  name: '',
  phone: '',
};

export default function SignUpForm() {
  const router = useRouter();
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const handleRememberChange = () => {
    setIsAgreed(!isAgreed);
  };
  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    try {
      setIsLoading(true);
      const { name, phone, email, password } = data;

      const formData = {
        name,
        phone,
        email,
        password,
      };

      const response = await signUp(formData);
      localStorage.setItem('token', response?.data?.token);
      setReset({ ...initialValues, isAgreed: false });
      toast.success('Registered successfully!', {
        duration: 2000,
      });
      router.push('/business-info/add-business');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              label="Name"
              placeholder="Enter your name"
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              label="Phone"
              placeholder="Enter your phone number"
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('phone')}
              error={errors.phone?.message}
            />
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
            <div className="flex items-start pb-2 text-gray-700">
              <Checkbox
                checked={isAgreed}
                onChange={handleRememberChange}
                color="info"
                variant="flat"
              />
              <p className="-mt-0.5 ps-2 text-sm leading-relaxed">
                By signing up you have agreed to our{' '}
                <Link
                  href="/"
                  className="font-semibold text-blue transition-colors hover:text-gray-1000"
                >
                  Terms
                </Link>{' '}
                &{' '}
                <Link
                  href="/"
                  className="font-semibold text-blue transition-colors hover:text-gray-1000"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
            <Button
              className="w-full border-2 border-primary-light text-base font-medium"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill"
              disabled={!isAgreed || loading}
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
                'Create Account'
              )}
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        Already have an account?{' '}
        <Link
          href={routes.auth.signIn2}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
