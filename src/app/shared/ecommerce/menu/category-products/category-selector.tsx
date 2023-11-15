'use client';
import React from 'react';

interface CategorySelectorProps {
  categories: { id: string; name: string }[];
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="categorySelector" className="text-lg font-semibold">
        Select a Category:
      </label>
      <select
        id="categorySelector"
        className="ml-2 rounded border p-2"
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
