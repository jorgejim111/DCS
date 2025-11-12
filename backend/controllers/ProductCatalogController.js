const ProductCatalog = require('../models/ProductCatalog');
const yup = require('yup');

const productSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  die_description_id: yup.number().required('Die Description is required'),
  material_id: yup.number().required('Material is required'),
  is_active: yup.boolean().default(true),
});

module.exports = {
  // Obtener todos los productos (activos e inactivos)
  async getAll(req, res) {
    try {
      const products = await ProductCatalog.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products', details: error.message });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductCatalog.findById(id);
      if (!product || !product.is_active) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching product', details: error.message });
    }
  },
  async create(req, res) {
    try {
      await productSchema.validate(req.body);
  const { name, die_description_id, material_id, is_active } = req.body;
  const newProduct = await ProductCatalog.create({ name, die_description_id, material_id, is_active: is_active ?? true });
  res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: 'Validation or creation error', details: error.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      // Si solo se está actualizando is_active, no validar el esquema completo
      if (Object.keys(req.body).length === 1 && req.body.hasOwnProperty('is_active')) {
        const updated = await ProductCatalog.update(id, { is_active: req.body.is_active });
        if (!updated) {
          return res.status(404).json({ error: 'Product not found' });
        }
        return res.json({ message: 'Product updated' });
      }
      await productSchema.validate(req.body);
      const { name, die_description_id, material_id, is_active } = req.body;
      const updated = await ProductCatalog.update(id, { name, die_description_id, material_id, is_active });
      if (!updated) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product updated' });
    } catch (error) {
      res.status(400).json({ error: 'Validation or update error', details: error.message });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await ProductCatalog.update(id, { is_active: false });
      if (!deleted) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product marked as inactive' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product', details: error.message });
    }
  },
  async getActive(req, res) {
    try {
      const products = await ProductCatalog.findActive();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching active products', details: error.message });
    }
  },
};
