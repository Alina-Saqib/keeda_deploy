'use client';
import React, { useState, useEffect } from 'react';
import CategorySelector from './category-selector';
import { ProductList } from './product-list';
import {
  getSpecificMenuCategory,
  getSpecificCategoryProducts,
  getAllProducts,
} from '@/api-handler/api';
export default function CategoryProduct({ id }: { id?: string }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  console.log(id);
  const [categories, setAllCategories] = useState([]);
  const [products, setAllProducts] = useState([]);
  const fetchCategoryData = async (menuId: any) => {
    try {
      const response = await getSpecificMenuCategory(menuId);
      if (response) {
        setAllCategories(response?.data?.allCategoryOptions);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProductData = async (categoryId?: string | null) => {
    try {
      console.log(categoryId);
      if (categoryId) {
        const response = await getSpecificCategoryProducts(categoryId);
        if (response) {
          setAllProducts(response?.data?.allProductsOptions);
        }
      } else {
        const response = await getAllProducts();
        if (response) {
          setAllProducts(response?.data?.allProductsOptions);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchCategoryData(id);
  }, [id]);
  useEffect(() => {
    fetchProductData(selectedCategoryId);
  }, [selectedCategoryId]);
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="container mx-auto p-4">
      <CategorySelector
        categories={categories}
        onSelectCategory={handleCategoryChange}
      />
      <ProductList products={products} slug={id} />
    </div>
  );
}
