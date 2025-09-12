import React, { useEffect, useState } from 'react';
import BaseTableAdvanced from '../components/BaseTableAdvanced';
import { productSchema } from '../schemas/productSchema';
import { getProducts, createProduct, updateProduct } from '../services/productService';

export default function ProductCatalog() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProducts().then(setData);
  }, []);

  const handleAdd = async (form) => {
    await createProduct(form);
    getProducts().then(setData);
  };

  const handleEdit = async (form) => {
    await updateProduct(form.id, form);
    getProducts().then(setData);
  };

  const handleToggleActive = async (row) => {
    await updateProduct(row.id, { is_active: !row.is_active });
    getProducts().then(setData);
  };

  return (
    <BaseTableAdvanced
      schema={productSchema}
      data={data}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onToggleActive={handleToggleActive}
    />
  );
}
