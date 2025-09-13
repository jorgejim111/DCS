import React, { useEffect, useState } from 'react';
import BaseTableAdvanced from '../components/BaseTableAdvanced';
import { productSchema } from '../schemas/productSchema';
import { getProducts, createProduct, updateProduct, getDieDescriptions, getMaterials } from '../services/productService';
import ProductModal from '../components/modals/ProductModal';

export default function ProductCatalog() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [dieDescriptions, setDieDescriptions] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    getProducts().then(setData);
    getDieDescriptions().then(setDieDescriptions);
    getMaterials().then(setMaterials);
  }, []);

  const handleAdd = () => {
    setEditRecord(null);
    setModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditRecord(record);
    setModalOpen(true);
  };

  const handleSave = async (form) => {
    if (editRecord) {
      await updateProduct(editRecord.id, form);
    } else {
      await createProduct(form);
    }
    setModalOpen(false);
    setEditRecord(null);
    getProducts().then(setData);
  };

  const handleToggleActive = async (row) => {
    await updateProduct(row.id, { is_active: !row.is_active });
    getProducts().then(setData);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Product Catalog</h2>
      <BaseTableAdvanced
        schema={productSchema}
        data={data}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onToggleActive={handleToggleActive}
      />
      {modalOpen && (
        <ProductModal
          mode={editRecord ? 'edit' : 'add'}
          record={editRecord}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditRecord(null); }}
          dieDescriptions={dieDescriptions}
          materials={materials}
        />
      )}
    </div>
  );
}
