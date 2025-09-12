// Dynamic schema for Die Description catalog
export const dieDescriptionSchema = [
  { key: 'id', label: 'ID', type: 'number', editable: false, show: false },
  { key: 'inch', label: 'Inch', type: 'text', editable: false },
  { key: 'part', label: 'Part', type: 'text', editable: false },
  { key: 'description', label: 'Description', type: 'text', editable: false },
  { key: 'die_description', label: 'Die Description', type: 'text', editable: true, required: true },
  { key: 'min_in_circulation', label: 'Min In Circulation', type: 'number', editable: true, required: false },
  { key: 'min_in_stock', label: 'Min In Stock', type: 'number', editable: true, required: false },
  { key: 'is_active', label: 'Active', type: 'checkbox', editable: true, required: false },
];
