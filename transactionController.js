const db = require('../config/db');

exports.receiveStock = async (req, res) => {
  const { supplier_id, items } = req.body; 
  const client = await db.getClient();
  try {
    await client.query('BEGIN');
    let totalCost = 0;
    items.forEach(i => totalCost += (i.quantity_received * i.unit_price));
    
    const recNum = 'REC-' + Date.now();
    const receiptRes = await client.query(
      `INSERT INTO stock_receipts (receipt_number, supplier_id, received_by, total_cost) VALUES ($1, $2, $3, $4) RETURNING *`,
      [recNum, supplier_id, req.user.id, totalCost]
    );
    const receiptId = receiptRes.rows[0].id;

    for (let item of items) {
      await client.query(
        `INSERT INTO stock_receipt_items (stock_receipt_id, stock_item_id, quantity_received, unit_price) VALUES ($1, $2, $3, $4)`,
        [receiptId, item.stock_item_id, item.quantity_received, item.unit_price]
      );
      await client.query(
        `UPDATE stock_items SET quantity_available = quantity_available + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
        [item.quantity_received, item.stock_item_id]
      );
    }
    await client.query('COMMIT');
    res.status(201).json(receiptRes.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

exports.issueStock = async (req, res) => {
  const { department_id, receiver_name, purpose, items } = req.body; 
  const client = await db.getClient();
  try {
    await client.query('BEGIN');
    const issNum = 'ISS-' + Date.now();
    const issueRes = await client.query(
      `INSERT INTO stock_issues (issue_number, department_id, issued_by, receiver_name, purpose) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [issNum, department_id, req.user.id, receiver_name, purpose]
    );
    const issueId = issueRes.rows[0].id;

    for (let item of items) {
      const stockCheck = await client.query(
        `SELECT quantity_available, name FROM stock_items WHERE id = $1 FOR UPDATE`, 
        [item.stock_item_id]
      );
      const stockItem = stockCheck.rows[0];
      
      if (!stockItem || parseFloat(stockItem.quantity_available) < parseFloat(item.quantity_issued)) {
        throw new Error(`Insufficient volume matrix for item: ${stockItem ? stockItem.name : item.stock_item_id}`);
      }

      await client.query(
        `INSERT INTO stock_issue_items (stock_issue_id, stock_item_id, quantity_issued) VALUES ($1, $2, $3)`,
        [issueId, item.stock_item_id, item.quantity_issued]
      );
      await client.query(
        `UPDATE stock_items SET quantity_available = quantity_available - $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
        [item.quantity_issued, item.stock_item_id]
      );
    }
    await client.query('COMMIT');
    res.status(201).json(issueRes.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
};