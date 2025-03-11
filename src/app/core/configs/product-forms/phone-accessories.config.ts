import { CategoryFormConfig} from './product-form.types';

export const phoneAccessoriesConfig: CategoryFormConfig = {
  id: 'phone_accessories',
  name: 'Phone Accessories',
  fields: [

    {
      name: 'accessoryType',
      type: 'select',
      label: 'Accessory Type',
      required: true,
      options: [
        'Case',
        'Screen Protector',
        'Charger',
        'Cable',
        'Power Bank',
        'Phone Stand',
        'Car Mount',
        'Wireless Charger',
        'Memory Card',
        'Headphones',
        'Bluetooth Speaker'
      ],
      group: 'specifications'
    },
    {
      name: 'compatibility',
      type: 'multiselect',
      label: 'Compatible Devices',
      required: true,
      options: [
        'iPhone',
        'Samsung Galaxy',
        'Google Pixel',
        'OnePlus',
        'Universal'
      ],
      group: 'specifications'
    },
    {
      name: 'material',
      type: 'select',
      label: 'Material',
      required: false,
      options: [
        'Plastic',
        'Silicone',
        'Leather',
        'Metal',
        'Glass',
        'TPU',
        'Polycarbonate'
      ],
      group: 'specifications'
    },
    {
      name: 'color',
      type: 'text',
      label: 'Color',
      required: true,
      group: 'specifications'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions',
      required: false,
      placeholder: 'e.g., 150 x 75 x 10 mm',
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      required: false,
      options: [
        'Shock Resistant',
        'Water Resistant',
        'Wireless Charging Compatible',
        'Anti-Scratch',
        'Anti-Fingerprint',
        'Card Holder',
        'Kickstand'
      ],
      group: 'specifications'
    },
    {
      name: 'warranty',
      type: 'number',
      label: 'Warranty Period',
      required: false,
      unit: 'months',
      group: 'specifications'
    }
  ]
};
