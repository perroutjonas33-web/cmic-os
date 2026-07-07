const { supabaseAdmin } = require('../config/supabase');

// GET ALL USERS (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, setor_id, role, is_active, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE USER
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, setor_id, role, is_active, created_at')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE USER (Admin only)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, setor_id, role, is_active } = req.body;

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .update({
        name,
        setor_id,
        role,
        is_active,
        updated_at: new Date(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: 'User updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE USER (Admin only - soft delete)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ is_active: false })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: 'User deactivated', user: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET LOGIN LOGS (Admin only)
const getLoginLogs = async (req, res) => {
  try {
    const { user_id, limit = 100 } = req.query;

    let query = supabaseAdmin
      .from('login_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(parseInt(limit));

    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    const { data: logs, error } = await query;

    if (error) throw error;

    res.json({ logs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getLoginLogs,
};
