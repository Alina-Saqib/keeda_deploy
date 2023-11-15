import { metaObject } from '@/config/site.config';
import { Metadata } from 'next';
import CategoriesPage from '../../page';

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

export default function SpecificCategoriesPage({ params }: any) {
  return (
    <>
      <CategoriesPage id={params.id} />
    </>
  );
}
