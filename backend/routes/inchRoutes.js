const express = require('express');
const router = express.Router();
const InchCatalogController = require('../controllers/InchCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin'), InchCatalogController.getAll);
router.get('/:id', authenticateToken, authorizeRoles('admin'), InchCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin'), InchCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), InchCatalogController.update);
// No se elimina nunca un serial
// router.delete('/:id', InchCatalogController.delete);

module.exports = router;
