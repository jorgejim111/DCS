// Esquema para la tabla product
export const productSchema = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'die_description', label: 'Die Description', type: 'text', required: false },
  { key: 'material', label: 'Material', type: 'text', required: false },
  { key: 'die_description_id', label: 'Die Description', type: 'select', required: true, source: '/api/die-description', optionLabel: 'die_description', optionValue: 'id', hideInTable: true },
  { key: 'material_id', label: 'Material', type: 'select', required: true, source: '/api/material', optionLabel: 'name', optionValue: 'id', hideInTable: true },
  { key: 'is_active', label: 'Active', type: 'boolean', required: false },
];
