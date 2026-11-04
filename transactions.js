const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/receive', authenticateToken, authorizeRoles('STORE_MANAGER', 'SUPER_ADMIN'), transactionController.receiveStock);
router.post('/issue', authenticateToken, authorizeRoles('STORE_MANAGER', 'SUPER_ADMIN'), transactionController.issueStock);

module.exports = router;