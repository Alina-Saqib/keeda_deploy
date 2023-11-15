import { metaObject } from '@/config/site.config';
import MenuCategoriesPage from './[id]/categories/page';
import CategoryProduct from '@/app/shared/ecommerce/menu/category-products/category-product';
export const metadata = {
  ...metaObject('Menus'),
};

export default function MenusPage({ id }: { id?: string | undefined }) {
  return (
    <>
      <CategoryProduct id={id} />
    </>
  );
}
