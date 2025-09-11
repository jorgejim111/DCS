const express = require('express');
const router = express.Router();
const WorkerController = require('../controllers/WorkerController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/', authenticateToken, authorizeRoles('admin'), WorkerController.getAll);
router.get('/:id', authenticateToken, authorizeRoles('admin'), WorkerController.getById);
router.post('/', authenticateToken, authorizeRoles('admin'), WorkerController.create);
router.put('/:id', authenticateToken, authorizeRoles('admin'), WorkerController.update);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), WorkerController.delete);

module.exports = router;
