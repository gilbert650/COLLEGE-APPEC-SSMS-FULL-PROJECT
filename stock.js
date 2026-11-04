const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { logAction } = require('../middleware/audit');

router.get('/', authenticateToken, stockController.getAllItems);
router.post('/', authenticateToken, authorizeRoles('SUPER_ADMIN', 'STORE_MANAGER'), logAction('CREATE', 'stock_items'), stockController.createItem);

module.exports = router;