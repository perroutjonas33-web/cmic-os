const bcrypt = require('bcryptjs');
const { supabaseAdmin } = require('../config/supabase');
const { generateToken } = require('../config/jwt');

// SIGNUP - Novo usuário
const signup = async (req, res) => {
  try {
    const { email, password, name, setor_id } = req.body;

    // Validações
    if (!email || !password || !name || !setor_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Verifica se usuário já existe
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Cria usuário
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert([
        {
          email,
          password_hash,
          name,
          setor_id: parseInt(setor_id),
          role: 'user',
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Gera token
    const token = generateToken(user);

    res.status(201).json({
      message: 'User registered successfully',
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
    console.error('Signup error:', error);
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Busca usuário
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verifica se está ativo
    if (!user.is_active) {
      return res.status(401).json({ error: 'User is inactive' });
    }

    // Verifica password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      // Log failed attempt
      await supabaseAdmin.from('login_logs').insert([
        {
          user_id: user.id,
          ip_address: req.ip,
          user_agent: req.headers['user-agent'],
          success: false,
        },
      ]);

      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Log successful login
    await supabaseAdmin.from('login_logs').insert([
      {
        user_id: user.id,
        ip_address: req.ip,
        user_agent: req.headers['user-agent'],
        success: true,
      },
    ]);

    // Gera token
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

// GET CURRENT USER
const getCurrentUser = async (req, res) => {
  try {
    res.json({
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login, getCurrentUser };
