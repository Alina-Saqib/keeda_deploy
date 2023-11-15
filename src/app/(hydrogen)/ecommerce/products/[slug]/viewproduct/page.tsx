import { metaObject } from '@/config/site.config';
import { Metadata } from 'next';
import ProductsPage from '../../page';

type Props = {
  params: { slug: string };
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  return metaObject(`${slug}`);
}
export default function SpecificProductsPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <ProductsPage id={params.slug} />
    </>
  );
}
