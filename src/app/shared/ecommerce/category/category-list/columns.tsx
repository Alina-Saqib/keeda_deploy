'use client';

import Link from 'next/link';
import Image from 'next/image';
import { routes } from '@/config/routes';
import { Title, Text } from '@/components/ui/text';
import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import { convertHTMLToPlainText } from '@/components/shared/htmltoText';
import AvatarCard from '@/components/ui/avatar-card';
import EyeIcon from '@/components/icons/eye';
type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: any) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: any) => void;
};

export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  onChecked,
}: Columns) => [
  {
    title: <></>,
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-2">
        <Checkbox
          value={row.id}
          className="cursor-pointer"
          {...(onChecked && { onChange: (e) => onChecked(e, e.target.value) })}
        />
      </div>
    ),
  },
  // {
  //   title: <HeaderCell title="Image" />,
  //   dataIndex: 'image',
  //   key: 'image',
  //   width: 100,
  //   render: (image: any, row: any) => (
  //     <figure className="relative aspect-square w-12 overflow-hidden rounded-lg bg-gray-100">
  //       <Image
  //         alt={row.name}
  //         src={image}
  //         fill
  //         sizes="(max-width: 768px) 100vw"
  //         className="object-cover"
  //       />
  //     </figure>
  //   ),
  // },
  // {
  //   title: (
  //     <HeaderCell
  //       title="Category Name"
  //       sortable
  //       ascending={
  //         sortConfig?.direction === 'asc' && sortConfig?.key === 'name'
  //       }
  //     />
  //   ),
  //   dataIndex: 'name',
  //   key: 'name',
  //   width: 200,
  //   onHeaderCell: () => onHeaderCellClick('name'),
  //   render: (name: any) => (
  //     <Title as="h6" className="!text-sm font-medium">
  //       {name}
  //     </Title>
  //   ),
  // },
  {
    title: <HeaderCell title="Category" />,
    dataIndex: 'category',
    key: 'category',
    width: 300,
    hidden: 'customer',
    render: (_: string, row: any) => (
      <AvatarCard
        src={row.image}
        name={row.name}
        description={row.category}
        avatarProps={{
          name: row.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Description" />,
    dataIndex: 'description',
    key: 'description',
    width: 250,
    render: (description: any) => (
      <Text className="truncate !text-sm ">
        {convertHTMLToPlainText(description)}
      </Text>
    ),
  },

  {
    title: (
      <HeaderCell
        title="Products"
        align="center"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'products'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('products'),
    dataIndex: 'products',
    key: 'products',
    width: 120,
    render: (products: any) => <div className="text-center">{products}</div>,
  },
  // {
  //   title: <></>,
  //   dataIndex: 'action',
  //   key: 'action',
  //   width: 100,
  //   render: (_: string, row: any) => (
  //     <div className="flex items-center justify-end gap-3 pe-4">
  //       <Tooltip
  //         size="sm"
  //         content={() => 'Edit Category'}
  //         placement="top"
  //         color="invert"
  //       >
  //         <Link href={routes.eCommerce.editCategory(row.id)}>
  //           <ActionIcon size="sm" variant="outline">
  //             <PencilIcon className="h-4 w-4" />
  //           </ActionIcon>
  //         </Link>
  //       </Tooltip>
  //       <DeletePopover
  //         title={`Delete the category`}
  //         description={`Are you sure you want to delete this #${row.id} category?`}
  //         onDelete={() => onDeleteItem(row.id)}
  //       />
  //     </div>
  //   ),
  // },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Category'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.editCategory(row.id)}>
            <ActionIcon size="sm" variant="outline" aria-label={'Edit Product'}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Products'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.specificCategoryProduct(row.id)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'View Products'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <DeletePopover
          title={`Delete the category`}
          description={`Are you sure you want to delete this #${row.id} category?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
