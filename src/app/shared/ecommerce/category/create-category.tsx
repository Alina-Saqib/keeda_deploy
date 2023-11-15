'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SubmitHandler, Controller } from 'react-hook-form';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text, Title } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import cn from '@/utils/class-names';
import { getOutletOptions } from '@/api-handler/api';
import { useRouter } from 'next/navigation';
import {
  CategoryFormInput,
  categoryFormSchema,
} from '@/utils/validators/create-category.schema';
import { addCategory, getCategoryById } from '@/api-handler/api';
import toast from 'react-hot-toast';
type Category = {
  description: string;
  id: number;
  menuId: number;
  name: string;
};
//import UploadZone from '@/components/ui/file-upload/upload-zone';
const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[168px]" />,
});

// a reusable form wrapper component
function HorizontalFormBlockWrapper({
  title,
  description,
  children,
  className,
  isModalView = true,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
  isModalView?: boolean;
}>) {
  return (
    <div
      className={cn(
        className,
        isModalView ? '@5xl:grid @5xl:grid-cols-6' : ' '
      )}
    >
      {isModalView && (
        <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
          <Title as="h6" className="font-semibold">
            {title}
          </Title>
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        </div>
      )}

      <div
        className={cn(
          'grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5',
          isModalView ? 'col-span-4' : ' '
        )}
      >
        {children}
      </div>
    </div>
  );
}

// main category form component for create and update category
export default function CreateCategory({
  id,
  category,
  isModalView = true,
}: {
  id?: string;
  isModalView?: boolean;
  category?: CategoryFormInput;
}) {
  console.log(id);
  const router = useRouter();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [outlets, setOutlets] = useState([]);
  const [singleCategory, setSingleCategory] = useState<Category | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOutletOptions();
        if (response) {
          setOutlets(response?.data?.outletOptions);
        }
      } catch (error) {
        console.error('Error fetching outlets:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategoryById(id);
        console.log(response);
        if (response) {
          setSingleCategory(response?.data?.category);
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchData();
  }, [id]);
  console.log(singleCategory);
  const onSubmit: SubmitHandler<CategoryFormInput> = async (data) => {
    setLoading(true);
    try {
      const { name, description, outlet } = data;
      console.log(outlet);
      const formData = {
        name,
        description,
        outletName: outlet,
      };
      const response = await addCategory(formData);
      console.log(response);
      if (response) {
        toast.success('Category created successfully!', {
          duration: 2000,
        });
      }
      router.push('/ecommerce/products/create');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Category creation failed:', error);
    }
  };
  return (
    <Form<CategoryFormInput>
      validationSchema={categoryFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: category,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <div
              className={cn(
                'grid grid-cols-1 ',
                isModalView
                  ? 'grid grid-cols-1 gap-8 divide-y divide-dashed  divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11'
                  : 'gap-5'
              )}
            >
              <HorizontalFormBlockWrapper
                title={'Add new category:'}
                description={'Edit your category information from here'}
                isModalView={isModalView}
              >
                <Input
                  label="Category Name"
                  placeholder="category name"
                  value={singleCategory?.name}
                  {...register('name')}
                  error={errors.name?.message}
                />
                <Controller
                  name="outlet"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={outlets}
                      value={value}
                      onChange={onChange}
                      label="Outlets"
                      error={errors?.outlet?.message as string}
                      getOptionValue={(option) => option.name}
                    />
                  )}
                />
                <div className="col-span-2">
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <QuillEditor
                        value={value}
                        onChange={onChange}
                        label="Description"
                        className="[&>.ql-container_.ql-editor]:min-h-[100px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                      />
                    )}
                  />
                </div>
              </HorizontalFormBlockWrapper>
            </div>
          </div>

          <div
            className={cn(
              'sticky bottom-0 z-40 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
              isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
            )}
          >
            <Button variant="outline" className="w-full @xl:w-auto">
              Save as Draft
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              {isLoading ? (
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
              ) : id ? (
                'Update Category'
              ) : (
                'Create Category'
              )}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
