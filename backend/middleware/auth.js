const { verifyToken } = require('../config/jwt');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

const requireSameSetor = (req, res, next) => {
  const userSetor = req.user?.setor_id;
  const requiredSetor = req.body?.setor_id || req.params?.setor_id;

  if (req.user?.role !== 'admin' && userSetor !== requiredSetor) {
    return res.status(403).json({ error: 'Access denied: different sector' });
  }
  next();
};

module.exports = { authMiddleware, requireAdmin, requireSameSetor };
