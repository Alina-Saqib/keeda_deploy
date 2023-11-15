'use client';
import { useState, useEffect } from 'react';
import { AddMenuSchema, addMenuSchema } from '@/utils/validators/add-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { addMenu, getMenuById, updateMenu } from '@/api-handler/api';
import { useRouter, useParams } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function AddMenuForm({ id }: { id?: string | undefined }) {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const router = useRouter();
  const { outletId } = useParams();
  const [reset, setReset] = useState({});
  const [menuName, setMenuName] = useState<string>('');
  const [loading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getMenuById(id);
      if (response) {
        setMenuName(response?.data?.menu?.name || '');
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenuName(event.target.value);
  };

  const onSubmit: SubmitHandler<AddMenuSchema> = async (data) => {
    try {
      setIsLoading(true);
      const { name } = data;
      const formData = {
        name,
      };
      if (id) {
        const Data = {
          menuName,
        };
        const updateResponse = await updateMenu(id, Data);
        console.log(updateResponse);
        toast.success('Menu updated successfully!', {
          duration: 2000,
        });
        router.push('/');
      } else {
        const outletId = localStorage.getItem('outletId');
        const response = await addMenu(formData, outletId);
        console.log(response);
        toast.success('Menu created successfully!', {
          duration: 2000,
        });
        router.push('/ecommerce/categories/create');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Menu creation failed:', error);
    }
  };

  return (
    <>
      <Form<AddMenuSchema>
        validationSchema={addMenuSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: { name: menuName || '' },
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="mt-4 space-y-5">
            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              placeholder="Enter your menu name"
              color="info"
              rounded="pill"
              className="[&>label>span]:font-medium"
              {...register('name')}
              value={menuName}
              onChange={handleNameChange}
              error={errors.name?.message}
            />

            <Button
              className="w-full border-2 border-primary-light text-base font-medium"
              type="submit"
              rounded="pill"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
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
              ) : id ? (
                'Update Menu'
              ) : (
                'Create Menu'
              )}
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
