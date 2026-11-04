const db = require('../config/db');

exports.getAllItems = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT s.*, c.name as category_name FROM stock_items s 
       JOIN categories c ON s.category_id = c.id ORDER BY s.name ASC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createItem = async (req, res) => {
  const { item_code, name, description, category_id, minimum_stock_level, unit_of_measure } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO stock_items (item_code, name, description, category_id, minimum_stock_level, unit_of_measure) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [item_code, name, description, category_id, minimum_stock_level, unit_of_measure]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};