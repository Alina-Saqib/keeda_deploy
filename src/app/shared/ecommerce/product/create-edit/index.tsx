'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import cn from '@/utils/class-names';
import FormNav, {
  formParts,
} from '@/app/shared/ecommerce/product/create-edit/form-nav';
import ProductSummary from '@/app/shared/ecommerce/product/create-edit/product-summary';
import { defaultValues } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import ProductMedia from '@/app/shared/ecommerce/product/create-edit/product-media';
import { addProduct } from '@/api-handler/api';
import { useRouter } from 'next/navigation';
//import { Text } from '@/components/ui/text';
// import PricingInventory from '@/app/shared/ecommerce/product/create-edit/pricing-inventory';
// import ProductIdentifiers from '@/app/shared/ecommerce/product/create-edit/product-identifiers';
// import ShippingInfo from '@/app/shared/ecommerce/product/create-edit/shipping-info';
// import ProductSeo from '@/app/shared/ecommerce/product/create-edit/product-seo';
// import DeliveryEvent from '@/app/shared/ecommerce/product/create-edit/delivery-event';
import ProductVariants from '@/app/shared/ecommerce/product/create-edit/product-variants';
import ProductTaxonomies from '@/app/shared/ecommerce/product/create-edit/product-tags';
import FormFooter from '@/components/form-footer';
import {
  CreateProductInput,
  productFormSchema,
} from '@/utils/validators/create-product.schema';
import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
  [formParts.media]: ProductMedia,
  //[formParts.pricingInventory]: PricingInventory,
  //[formParts.productIdentifiers]: ProductIdentifiers,
  //[formParts.shipping]: ShippingInfo,
  // [formParts.seo]: ProductSeo,
  //[formParts.deliveryEvent]: DeliveryEvent,
  [formParts.variantOptions]: ProductVariants,
  [formParts.tagsAndCategory]: ProductTaxonomies,
};

interface IndexProps {
  slug?: string;
  className?: string;
  product?: CreateProductInput;
}

export default function CreateEditProduct({
  slug,
  product,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues(product),
  });

  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
    try {
      const {
        title,
        price,
        sku,
        unit,
        outlet,
        categories,
        fulfilmentMethod,
        productVariants,
        tags,
        subscriptionType,
        discountPercent,
        description,
        customDays,
      } = data;

      const formData = {
        title,
        price,
        SKU: sku,
        unit_name: unit,
        outlet,
        categoryName: categories,
        fulfilment_method: fulfilmentMethod,
        photourl: 'sddd',
        tags,
        productVariants,
        subscription_type: subscriptionType,
        discount_percent: discountPercent,
        description,
        customDays,
      };
      console.log(customDays, subscriptionType);
      const response = await addProduct(formData);
      console.log(response);
      if (response) {
        toast.success('Product created successfully!', {
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Production creation failed:', error);
    } finally {
      router.push('/ecommerce/menus');
    }
  };
  return (
    <div className="@container">
      <FormNav
        className={cn(layout === LAYOUT_OPTIONS.BERYLLIUM && '2xl:top-[72px]')}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn('[&_label.block>span]:font-medium', className)}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Update Product' : 'Create Product'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
