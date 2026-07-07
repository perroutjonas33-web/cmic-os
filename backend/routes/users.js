const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getLoginLogs,
} = require('../controllers/userController');
const { authMiddleware, requireAdmin } = require('../middleware/auth');

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// Admin routes
router.get('/', requireAdmin, getAllUsers);
router.get('/:id', requireAdmin, getUser);
router.put('/:id', requireAdmin, updateUser);
router.delete('/:id', requireAdmin, deleteUser);
router.get('/logs/login', requireAdmin, getLoginLogs);

module.exports = router;
