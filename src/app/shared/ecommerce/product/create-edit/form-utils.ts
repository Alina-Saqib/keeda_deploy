import { CreateProductInput } from '@/utils/validators/create-product.schema';
import isEmpty from 'lodash/isEmpty';

export const customFields = [
  {
    label: '',
    value: '',
  },
];
export const locationShipping = [
  {
    name: '',
    shippingCharge: '',
  },
];
export const productVariants = [
  {
    name: '',
    value: '',
  },
];

export function defaultValues(product?: CreateProductInput) {
  return {
    title: product?.title ?? '',
    sku: product?.sku ?? '',
    // type: product?.type ?? '',
    categories: product?.categories ?? '',
    fulfilmentMethod: product?.fulfilmentMethod ?? '',
    subscriptionType: product?.subscriptionType ?? '',
    discountPercent: product?.discountPercent ?? '',
    unit: product?.unit ?? '',
    //description: product?.description ?? '',
    price: product?.price ?? undefined,
    //costPrice: product?.costPrice ?? undefined,
    //retailPrice: product?.retailPrice ?? undefined,
    //salePrice: product?.salePrice ?? undefined,
    // inventoryTracking: product?.inventoryTracking ?? '',
    // currentStock: product?.currentStock ?? '',
    // lowStock: product?.lowStock ?? '',
    // productAvailability: product?.productAvailability ?? '',
    productImages: product?.productImages ?? undefined,
    // tradeNumber: product?.tradeNumber ?? '',
    // manufacturerNumber: product?.manufacturerNumber ?? '',
    // brand: product?.brand ?? '',
    // upcEan: product?.upcEan ?? '',
    // customFields: isEmpty(product?.customFields)
    //   ? customFields
    //   : product?.customFields,

    // freeShipping: product?.freeShipping ?? false,
    // shippingPrice: product?.shippingPrice ?? undefined,
    // locationBasedShipping: product?.locationBasedShipping ?? false,
    // locationShipping: isEmpty(product?.locationShipping)
    //   ? locationShipping
    //   : product?.locationShipping,
    // pageTitle: product?.pageTitle ?? '',
    // metaDescription: product?.metaDescription ?? '',
    // metaKeywords: product?.metaKeywords ?? '',
    // productUrl: product?.productUrl ?? '',
    // isPurchaseSpecifyDate: product?.isPurchaseSpecifyDate ?? false,
    // isLimitDate: product?.isLimitDate ?? false,
    // dateFieldName: product?.dateFieldName ?? '',
    productVariants: isEmpty(product?.productVariants)
      ? productVariants
      : product?.productVariants,
    tags: product?.tags ?? [],
  };
}

export const productData = {
  title: 'Apple',
  description: 'Fresh Express Iceberg Garden Salad Blend',
  sku: 'SKU-28935',
  type: 'Digital Product',
  categories: 'Grocery',
  price: 10,
  costPrice: 20,
  retailPrice: 15,
  salePrice: 25,
  productImages: undefined,
  inventoryTracking: 'no',
  currentStock: '150',
  lowStock: '20',
  productAvailability: 'online',
  tradeNumber: '12345',
  manufacturerNumber: '154',
  brand: 'Foska',
  upcEan: 'Ean',
  customFields: [
    {
      label: 'Color',
      value: 'Red',
    },
  ],
  freeShipping: false,
  shippingPrice: 45,
  locationBasedShipping: true,
  locationShipping: [
    {
      name: 'USA',
      shippingCharge: '150',
    },
  ],
  pageTitle: 'apple',
  metaDescription: 'apple',
  metaKeywords: 'grocery, foods',
  productUrl: 'http://localhost:3000/',
  isPurchaseSpecifyDate: true,
  isLimitDate: true,
  dateFieldName: 'Date Field',
  productVariants: [
    {
      name: 'Jhon',
      value: '150',
    },
  ],
  tags: ['iPhone', 'mobile'],
};

export const menuItems = [
  {
    label: 'Summary',
    value: 'summary',
  },
  {
    label: 'Images & Gallery',
    value: 'images_gallery',
  },
  {
    label: 'Pricing & Inventory',
    value: 'pricing_inventory',
  },
  {
    label: 'Product Identifiers & Custom Fields',
    value: 'product_identifiers',
  },
  {
    label: 'Shipping & Availability',
    value: 'shipping_availability',
  },
  {
    label: 'SEO',
    value: 'seo',
  },
  {
    label: 'Variant Options',
    value: 'variant_options',
  },
];

// Type option
export const typeOption = [
  {
    value: 'digital product',
    name: 'Digital Product',
  },
  {
    value: 'physical product',
    name: 'Physical Product',
  },
];

// Variant option
export const variantOption = [
  {
    value: 'color',
    name: 'Color',
  },
  {
    value: 'size',
    name: 'Size',
  },
];

// Variant value option
export const variantValueOption = [
  {
    value: 'green',
    name: 'Green',
  },
  {
    value: 'lg',
    name: 'lg',
  },
];

// Subscription Type option
export const unit = [
  {
    value: 'kg',
    name: 'kg',
  },
  {
    value: 'lb',
    name: 'lb',
  },
  {
    value: 'L',
    name: 'L',
  },
  {
    value: 'm',
    name: 'm',
  },
  {
    value: 'pc',
    name: 'pc',
  },
];
// Discount
export const discountPercent = [
  {
    value: '0',
    name: '0',
  },
  {
    value: '5',
    name: '5',
  },
  {
    value: '10',
    name: '10',
  },
  {
    value: '15',
    name: '15',
  },
  {
    value: '20',
    name: '20',
  },
  {
    value: '25',
    name: '25',
  },
  {
    value: '30',
    name: '30',
  },
  {
    value: '35',
    name: '35',
  },
  {
    value: '40',
    name: '40',
  },
  {
    value: '45',
    name: '45',
  },
  {
    value: '50',
    name: '50',
  },
  {
    value: '55',
    name: '55',
  },
  {
    value: '60',
    name: '60',
  },
  {
    value: '65',
    name: '65',
  },
  {
    value: '70',
    name: '70',
  },
  {
    value: '75',
    name: '75',
  },
  {
    value: '80',
    name: '80',
  },
  {
    value: '85',
    name: '85',
  },
  {
    value: '90',
    name: '90',
  },
  {
    value: '05',
    name: '95',
  },
  {
    value: '100',
    name: '100',
  },
];
// Business Type option
export const businessType = [
  {
    value: 'cafes',
    name: 'Restaurants and cafes',
  },
  {
    value: 'beverages',
    name: 'Beverages and drinks',
  },
];
// Week days option
export const daysOfWeek: any[] = [
  { name: 'Monday', openTime: '', closeTime: '' },
  { name: 'Tuesday', openTime: '', closeTime: '' },
  { name: 'Wednesday', openTime: '', closeTime: '' },
  { name: 'Thursday', openTime: '', closeTime: '' },
  { name: 'Friday', openTime: '', closeTime: '' },
  { name: 'Saturday', openTime: '', closeTime: '' },
  { name: 'Sunday', openTime: '', closeTime: '' },
];
// select time option
export const selectTime: any[] = [
  { value: '01:00 AM', label: '1 AM' },
  { value: '02:00 AM', label: '2 AM' },
  { value: '03:00 AM', label: '3 AM' },
  { value: '04:00 AM', label: '4 AM' },
  { value: '05:00 AM', label: '5 AM' },
  { value: '06:00 AM', label: '6 AM' },
  { value: '07:00 AM', label: '7 AM' },
  { value: '08:00 AM', label: '8 AM' },
  { value: '09:00 AM', label: '9 AM' },
  { value: '010:00 AM', label: '10 AM' },
  { value: '011:00 AM', label: '11 AM' },
  { value: '012:00 AM', label: '12 AM' },
  { value: '001:00 PM', label: '1 PM' },
  { value: '002:00 PM', label: '2 PM' },
  { value: '003:00 PM', label: '3 PM' },
  { value: '004:00 PM', label: '4 PM' },
  { value: '005:00 PM', label: '5 PM' },
  { value: '006:00 PM', label: '6 PM' },
  { value: '007:00 PM', label: '7 PM' },
  { value: '008:00 PM', label: '8 PM' },
  { value: '009:00 PM', label: '9 PM' },
  { value: '0010:00 PM', label: '10 PM' },
  { value: '0011:00 PM', label: '11 PM' },
  { value: '0012:00 PM', label: '12 PM' },
];

export const countries = [
  { value: 'AF', name: 'Afghanistan' },
  { value: 'AL', name: 'Albania' },
  { value: 'DZ', name: 'Algeria' },
  { value: 'AD', name: 'Andorra' },
  { value: 'AO', name: 'Angola' },
  { value: 'AG', name: 'Antigua and Barbuda' },
  { value: 'AR', name: 'Argentina' },
  { value: 'AM', name: 'Armenia' },
  { value: 'AU', name: 'Australia' },
  { value: 'AT', name: 'Austria' },
  { value: 'AZ', name: 'Azerbaijan' },
  { value: 'BS', name: 'Bahamas' },
  { value: 'BH', name: 'Bahrain' },
  { value: 'BD', name: 'Bangladesh' },
  { value: 'BB', name: 'Barbados' },
  { value: 'BY', name: 'Belarus' },
  { value: 'BE', name: 'Belgium' },
  { value: 'BZ', name: 'Belize' },
  { value: 'BJ', name: 'Benin' },
  { value: 'BT', name: 'Bhutan' },
  { value: 'BO', name: 'Bolivia' },
  { value: 'BA', name: 'Bosnia and Herzegovina' },
  { value: 'BW', name: 'Botswana' },
  { value: 'BR', name: 'Brazil' },
  { value: 'BN', name: 'Brunei' },
  { value: 'BG', name: 'Bulgaria' },
  { value: 'BF', name: 'Burkina Faso' },
  { value: 'BI', name: 'Burundi' },
  { value: 'KH', name: 'Cambodia' },
  { value: 'CM', name: 'Cameroon' },
  { value: 'CA', name: 'Canada' },
  { value: 'CV', name: 'Cape Verde' },
  { value: 'CF', name: 'Central African Republic' },
  { value: 'TD', name: 'Chad' },
  { value: 'CL', name: 'Chile' },
  { value: 'CN', name: 'China' },
  { value: 'CO', name: 'Colombia' },
  { value: 'KM', name: 'Comoros' },
  { value: 'CD', name: 'Democratic Republic of the Congo' },
  { value: 'CG', name: 'Republic of the Congo' },
  { value: 'CR', name: 'Costa Rica' },
  { value: 'HR', name: 'Croatia' },
  { value: 'CU', name: 'Cuba' },
  { value: 'CY', name: 'Cyprus' },
  { value: 'CZ', name: 'Czech Republic' },
  { value: 'DK', name: 'Denmark' },
  { value: 'DJ', name: 'Djibouti' },
  { value: 'DM', name: 'Dominica' },
  { value: 'DO', name: 'Dominican Republic' },
  { value: 'TL', name: 'East Timor' },
  { value: 'EC', name: 'Ecuador' },
  { value: 'EG', name: 'Egypt' },
  { value: 'SV', name: 'El Salvador' },
  { value: 'GQ', name: 'Equatorial Guinea' },
  { value: 'ER', name: 'Eritrea' },
  { value: 'EE', name: 'Estonia' },
  { value: 'ET', name: 'Ethiopia' },
  { value: 'FJ', name: 'Fiji' },
  { value: 'FI', name: 'Finland' },
  { value: 'FR', name: 'France' },
  { value: 'GA', name: 'Gabon' },
  { value: 'GM', name: 'Gambia' },
  { value: 'GE', name: 'Georgia' },
  { value: 'DE', name: 'Germany' },
  { value: 'GH', name: 'Ghana' },
  { value: 'GR', name: 'Greece' },
  { value: 'GD', name: 'Grenada' },
  { value: 'GT', name: 'Guatemala' },
  { value: 'GN', name: 'Guinea' },
  { value: 'GW', name: 'Guinea-Bissau' },
  { value: 'GY', name: 'Guyana' },
  { value: 'HT', name: 'Haiti' },
  { value: 'HN', name: 'Honduras' },
  { value: 'HU', name: 'Hungary' },
  { value: 'IS', name: 'Iceland' },
  { value: 'IN', name: 'India' },
  { value: 'ID', name: 'Indonesia' },
  { value: 'IR', name: 'Iran' },
  { value: 'IQ', name: 'Iraq' },
  { value: 'IE', name: 'Ireland' },
  { value: 'IL', name: 'Israel' },
  { value: 'IT', name: 'Italy' },
  { value: 'CI', name: 'Ivory Coast' },
  { value: 'JM', name: 'Jamaica' },
  { value: 'JP', name: 'Japan' },
  { value: 'JO', name: 'Jordan' },
  { value: 'KZ', name: 'Kazakhstan' },
  { value: 'KE', name: 'Kenya' },
  { value: 'KI', name: 'Kiribati' },
  { value: 'KP', name: 'North Korea' },
  { value: 'KR', name: 'South Korea' },
  { value: 'KW', name: 'Kuwait' },
  { value: 'KG', name: 'Kyrgyzstan' },
  { value: 'LA', name: 'Laos' },
  { value: 'LV', name: 'Latvia' },
  { value: 'LB', name: 'Lebanon' },
  { value: 'LS', name: 'Lesotho' },
  { value: 'LR', name: 'Liberia' },
  { value: 'LY', name: 'Libya' },
  { value: 'LI', name: 'Liechtenstein' },
  { value: 'LT', name: 'Lithuania' },
  { value: 'LU', name: 'Luxembourg' },
  { value: 'MK', name: 'North Macedonia' },
  { value: 'MG', name: 'Madagascar' },
  { value: 'MW', name: 'Malawi' },
  { value: 'MY', name: 'Malaysia' },
  { value: 'MV', name: 'Maldives' },
  { value: 'ML', name: 'Mali' },
  { value: 'MT', name: 'Malta' },
  { value: 'MH', name: 'Marshall Islands' },
  { value: 'MR', name: 'Mauritania' },
  { value: 'MU', name: 'Mauritius' },
  { value: 'MX', name: 'Mexico' },
  { value: 'FM', name: 'Micronesia' },
  { value: 'MD', name: 'Moldova' },
  { value: 'MC', name: 'Monaco' },
  { value: 'MN', name: 'Mongolia' },
  { value: 'ME', name: 'Montenegro' },
  { value: 'MA', name: 'Morocco' },
  { value: 'MZ', name: 'Mozambique' },
  { value: 'MM', name: 'Myanmar' },
  { value: 'NA', name: 'Namibia' },
  { value: 'NR', name: 'Nauru' },
  { value: 'NP', name: 'Nepal' },
  { value: 'NL', name: 'Netherlands' },
  { value: 'NZ', name: 'New Zealand' },
  { value: 'NI', name: 'Nicaragua' },
  { value: 'NE', name: 'Niger' },
  { value: 'NG', name: 'Nigeria' },
  { value: 'NO', name: 'Norway' },
  { value: 'OM', name: 'Oman' },
  { value: 'PK', name: 'Pakistan' },
  { value: 'PW', name: 'Palau' },
  { value: 'PA', name: 'Panama' },
  { value: 'PG', name: 'Papua New Guinea' },
  { value: 'PY', name: 'Paraguay' },
  { value: 'PE', name: 'Peru' },
  { value: 'PH', name: 'Philippines' },
  { value: 'PL', name: 'Poland' },
  { value: 'PT', name: 'Portugal' },
  { value: 'QA', name: 'Qatar' },
  { value: 'RO', name: 'Romania' },
  { value: 'RU', name: 'Russia' },
  { value: 'RW', name: 'Rwanda' },
  { value: 'KN', name: 'Saint Kitts and Nevis' },
  { value: 'LC', name: 'Saint Lucia' },
  { value: 'VC', name: 'Saint Vincent and the Grenadines' },
  { value: 'WS', name: 'Samoa' },
  { value: 'SM', name: 'San Marino' },
  { value: 'ST', name: 'Sao Tome and Principe' },
  { value: 'SA', name: 'Saudi Arabia' },
  { value: 'SN', name: 'Senegal' },
  { value: 'RS', name: 'Serbia' },
  { value: 'SC', name: 'Seychelles' },
  { value: 'SL', name: 'Sierra Leone' },
  { value: 'SG', name: 'Singapore' },
  { value: 'SK', name: 'Slovakia' },
  { value: 'SI', name: 'Slovenia' },
  { value: 'SB', name: 'Solomon Islands' },
  { value: 'SO', name: 'Somalia' },
  { value: 'ZA', name: 'South Africa' },
  { value: 'SS', name: 'South Sudan' },
  { value: 'ES', name: 'Spain' },
  { value: 'LK', name: 'Sri Lanka' },
  { value: 'SD', name: 'Sudan' },
  { value: 'SR', name: 'Suriname' },
  { value: 'SZ', name: 'Eswatini' },
  { value: 'SE', name: 'Sweden' },
  { value: 'CH', name: 'Switzerland' },
  { value: 'SY', name: 'Syria' },
  { value: 'TJ', name: 'Tajikistan' },
  { value: 'TZ', name: 'Tanzania' },
  { value: 'TH', name: 'Thailand' },
  { value: 'TG', name: 'Togo' },
  { value: 'TO', name: 'Tonga' },
  { value: 'TT', name: 'Trinidad and Tobago' },
  { value: 'TN', name: 'Tunisia' },
  { value: 'TR', name: 'Turkey' },
  { value: 'TM', name: 'Turkmenistan' },
  { value: 'TV', name: 'Tuvalu' },
  { value: 'UG', name: 'Uganda' },
  { value: 'UA', name: 'Ukraine' },
  { value: 'AE', name: 'United Arab Emirates' },
  { value: 'UY', name: 'Uruguay' },
  { value: 'UZ', name: 'Uzbekistan' },
  { value: 'VU', name: 'Vanuatu' },
  { value: 'VA', name: 'Vatican City' },
  { value: 'VE', name: 'Venezuela' },
  { value: 'VN', name: 'Vietnam' },
  { value: 'YE', name: 'Yemen' },
  { value: 'ZM', name: 'Zambia' },
  { value: 'ZW', name: 'Zimbabwe' },
  // Add more countries as needed
];
