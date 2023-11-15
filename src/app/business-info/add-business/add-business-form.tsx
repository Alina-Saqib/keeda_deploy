'use client';

import { useState } from 'react';
import {
  AddBusinessSchema,
  addBusinessSchema,
} from '@/utils/validators/add-business';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMedia } from '@/hooks/use-media';
import { businessType } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import { Form } from '@/components/ui/form';
import { addBusiness } from '@/api-handler/api';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Controller } from 'react-hook-form';
import Select from '@/components/ui/select';
const initialValues = {
  name: '',
  type: '',
  description: '',
};
export default function AddBusinessForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const router = useRouter();
  const [reset, setReset] = useState({});
  const [loading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<AddBusinessSchema> = async (data) => {
    try {
      setIsLoading(true);
      const { name, type, description } = data;

      const formData = {
        name,
        type,
        description,
      };

      const response = await addBusiness(formData);
      toast.success('Business created successfully!', {
        duration: 2000,
      });
      console.log(response);
      router.push('/business-info/add-outlet');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Business creation failed:', error);
    }
  };
  return (
    <>
      <Form<AddBusinessSchema>
        validationSchema={addBusinessSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ control, register, formState: { errors } }) => (
          <div className="mt-6 space-y-5">
            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              placeholder="Enter your business name"
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('name')}
              error={errors.name?.message}
            />
            <div>
              <TextareaAutosize
                minRows={5}
                placeholder="Add description"
                {...register('description')}
                style={{
                  width: '100%',
                  color: 'black',
                  borderRadius: '12px',
                  overflow: 'auto',
                }}
              />
            </div>

            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  options={businessType}
                  value={value}
                  rounded="pill"
                  onChange={onChange}
                  getOptionValue={(option) => option.name}
                />
              )}
            />

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
                'Create Business'
              )}
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
