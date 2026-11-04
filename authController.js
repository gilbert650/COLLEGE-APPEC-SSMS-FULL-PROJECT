const db = require('../config/db');
  const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userRes = await db.query(
      `SELECT u.*, r.name as role_name FROM users u 
       JOIN roles r ON u.role_id = r.id WHERE u.username = $1`, 
      [username]
    );
    const user = userRes.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid validation security metrics' });
    }
    if (!user.is_active) return res.status(403).json({ error: 'Target account suspended' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role_name },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ token, user: { id: user.id, username: user.username, role: user.role_name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};