const express = require('express');
const router = express.Router();
const DescriptionDrCatalogController = require('../controllers/DescriptionDrCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin'), DescriptionDrCatalogController.getAll);
router.get('/all', authenticateToken, authorizeRoles('admin'), DescriptionDrCatalogController.getAllRaw);
router.get('/:id', authenticateToken, authorizeRoles('admin'), DescriptionDrCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin'), DescriptionDrCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), DescriptionDrCatalogController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), DescriptionDrCatalogController.delete);

module.exports = router;
