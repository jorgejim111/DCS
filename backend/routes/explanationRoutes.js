const express = require('express');
const router = express.Router();
const ExplanationCatalogController = require('../controllers/ExplanationCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin'), ExplanationCatalogController.getAll);
router.get('/all', authenticateToken, authorizeRoles('admin'), ExplanationCatalogController.getAllRaw);
router.get('/:id', authenticateToken, authorizeRoles('admin'), ExplanationCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin'), ExplanationCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), ExplanationCatalogController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), ExplanationCatalogController.delete);

module.exports = router;
