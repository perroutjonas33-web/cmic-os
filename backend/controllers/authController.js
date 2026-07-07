const { generateToken } = require('../config/jwt');

const mockUsers = {};

const signup = async (req, res) => {
  try {
    const { email, password, name, setor_id } = req.body;

    if (!email || !password || !name || !setor_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    if (mockUsers[email]) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = {
      id: Date.now(),
      email,
      name,
      setor_id: parseInt(setor_id),
      role: 'user',
    };

    mockUsers[email] = { ...user, password };
    const token = generateToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = mockUsers[email];
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        setor_id: user.setor_id,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login, getCurrentUser };
