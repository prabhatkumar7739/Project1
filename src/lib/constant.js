export const FIND_AND_REPLACE_FIELD_TYPES = [
  {
    key: 'size',
    label: 'Instance Type',
    options: [
      'c4-highmem-8',
      'c4-highmem-16',
      'c4-highmem-32',
      'm7xlarge'
    ]
  },
  {
    key: 'region',
    label: 'Region',
    options: [
      'us-east-1',
      'us-west',
      'europe',
      'africa-south1'
    ]
  },
  {
    key: 'pricingModel',
    label: 'Pricing Model',
    options: [
      'ondemand',
      'reserved',
      'spot'
    ]
  }
]; 