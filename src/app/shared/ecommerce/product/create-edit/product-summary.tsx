import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import {
  discountPercent,
  unit,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
import {
  getOutletOptions,
  getCategoryOptions,
  getAllFulfilments,
  getAllSubscriptions,
} from '@/api-handler/api';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function ProductSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const [outlets, setOutlets] = useState([]);
  const [categories, seCategories] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState('');
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [fulfilmentOptions, setfulfilmentOptions] = useState([]);
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
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
    const fetchCategoryData = async () => {
      try {
        const response = await getCategoryOptions(selectedOutlet);
        if (response) {
          seCategories(response?.data?.categoryOptions);
        }
      } catch (error) {
        console.error('Error fetching categoriess:', error);
      }
    };

    fetchCategoryData();
  }, [selectedOutlet]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllFulfilments();
        if (response) {
          setfulfilmentOptions(response?.data?.fulfilmentOptions);
        }
      } catch (error) {
        console.error('Error fetching fulfilments:', error);
      }
    };
    const fetchSubscriptionData = async () => {
      try {
        const response = await getAllSubscriptions();
        if (response) {
          setSubscriptionOptions(response?.data?.subscriptionOptions);
        }
      } catch (error) {
        console.error('Error fetching subscriptions :', error);
      }
    };
    fetchSubscriptionData();
    fetchData();
  }, []);
  return (
    <FormGroup
      title="Summary"
      description="Edit your product description and necessary information from here"
      className={cn(className)}
    >
      <Input
        label="Title"
        placeholder="Product title"
        {...register('title')}
        error={errors.title?.message as string}
      />
      <Input
        label="SKU"
        placeholder="Product sku"
        {...register('sku')}
        error={errors.sku?.message as string}
      />
      <Input
        label="Price"
        placeholder="Price"
        {...register('price')}
        error={errors.price?.message as string}
      />
      <Controller
        name="unit"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={unit}
            value={value}
            onChange={onChange}
            label="Unit"
            error={errors?.unit?.message as string}
            getOptionValue={(option) => option.name}
          />
        )}
      />
      <Controller
        name="outlet"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={outlets}
            value={value}
            onChange={(selectedOption) => {
              onChange(selectedOption);
              if (typeof selectedOption === 'string') {
                setSelectedOutlet(selectedOption);
              }
            }}
            label="Outlets"
            error={errors?.outlet?.message as string}
            getOptionValue={(option) => option.name}
          />
        )}
      />
      <Controller
        name="categories"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={categories}
            value={value}
            onChange={onChange}
            label="Categories"
            error={errors?.categories?.message as string}
            getOptionValue={(option) => option.name}
          />
        )}
      />
      <Controller
        name="fulfilmentMethod"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={fulfilmentOptions}
            value={value}
            onChange={onChange}
            label="Fulfilment Method"
            error={errors?.fulfilmentMethod?.message as string}
            getOptionValue={(option) => option.name}
          />
        )}
      />

      <Controller
        name="subscriptionType"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div>
            <Select
              options={subscriptionOptions}
              value={value}
              onChange={(selectedOption: any) => {
                console.log(selectedOption);
                onChange(selectedOption);
                setIsCustomSelected(
                  selectedOption === 'custom'
                    ? !isCustomSelected
                    : isCustomSelected
                );
              }}
              label="Subscription Type"
              error={errors?.subscriptionType?.message as string}
              getOptionValue={(option) => option.name}
            />
          </div>
        )}
      />
      {isCustomSelected && (
        <Input
          label="Enter Custom Days"
          placeholder="Enter custom days"
          {...register('customDays')}
        />
      )}
      <Controller
        name="discountPercent"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={discountPercent}
            value={value}
            onChange={onChange}
            label="Discount Percent"
            error={errors?.discountPercent?.message as string}
            getOptionValue={(option) => option.name}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Description"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      />
    </FormGroup>
  );
}
