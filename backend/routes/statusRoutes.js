const express = require('express');
const router = express.Router();
const StatusCatalogController = require('../controllers/StatusCatalogController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin'), StatusCatalogController.getAll);
router.get('/all', authenticateToken, authorizeRoles('admin'), StatusCatalogController.getAllRaw);
router.get('/:id', authenticateToken, authorizeRoles('admin'), StatusCatalogController.getById);
router.post('/', authenticateToken, authorizeRoles('admin'), StatusCatalogController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), StatusCatalogController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), StatusCatalogController.delete);

module.exports = router;
