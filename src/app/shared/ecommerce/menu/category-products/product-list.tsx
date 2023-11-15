'use client';
import React from 'react';
import Link from 'next/link';
import PencilIcon from '@/components/icons/pencil';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
interface Product {
  id: string;
  name: string;
  categoryId: string;
  category: string;
}

interface ProductListProps {
  products: Product[];
  slug: any;
}

export const ProductList: React.FC<ProductListProps> = ({ products, slug }) => {
  return (
    <div>
      <ul className="flex flex-wrap gap-8">
        {products.map((product) => (
          <li key={product.id} className="mb-2">
            <Link
              href={routes.eCommerce.productDetails(slug)}
              className="mt-9 w-full @lg:mt-0 @lg:w-auto"
            >
              <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
                <img
                  className="rounded-t-lg p-8"
                  src="/docs/images/products/apple-watch.png"
                  alt="product image"
                />

                <div className="px-5 pb-5">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product?.name}
                  </h5>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      $599
                    </span>

                    <Link
                      href={routes.eCommerce.ediProduct(product?.id)}
                      className="mt-9 w-full @lg:mt-0 @lg:w-auto"
                    >
                      <ActionIcon
                        size="sm"
                        variant="outline"
                        aria-label={'Edit Product'}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </ActionIcon>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
