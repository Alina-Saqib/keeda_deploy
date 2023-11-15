// export default function CategoriesPage({ id }: { id?: string | undefined }) {
//   return (
//     <>

//       <CategoryProduct id={id} />
//     </>
//   );
// }
import { metaObject } from '@/config/site.config';
import { Metadata } from 'next';
import MenusPage from '../../page';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import MenusTable from '@/app/shared/ecommerce/menu/menu-list/table';
import ExportButton from '@/app/shared/export-button';
import CategoryProduct from '@/app/shared/ecommerce/menu/category-products/category-product';

const pageHeader: any = {
  title: 'Menus',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'E-Commerce',
    },
    {
      href: routes.eCommerce.menus,
      name: 'Menus',
    },
    {
      name: 'List',
    },
  ],
};
type Props = {
  params: { id: string };
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  return metaObject(`${id}`);
}

export default function MenuCategoriesPage({ params }: any) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href={routes.business.addOutlet} className="w-full @lg:w-auto">
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Outlet
            </Button>
          </Link>
          <Link href={routes.business.addMenu} className="w-full @lg:w-auto">
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Menu
            </Button>
          </Link>
          <Link
            href={routes.eCommerce.createCategory}
            className="w-full @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Category
            </Button>
          </Link>
          <Link
            href={routes.eCommerce.createProduct}
            className="w-full @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Product
            </Button>
          </Link>
        </div>
      </PageHeader>
      <MenusPage id={params?.id} />
    </>
  );
}
