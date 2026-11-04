const db = require('../config/db');

const logAction = (action, tableName) => {
  return async (req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
      res.locals.body = data;
      originalJson.apply(res, arguments);
    };

    res.on('finish', async () => {
      try {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const userId = req.user ? req.user.id : null;
          const recordId = res.locals.body?.id || req.params.id || null;
          const ip = req.ip || req.connection.remoteAddress;

          await db.query(
            `INSERT INTO audit_logs (user_id, action, table_name, record_id, new_values, ip_address) 
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [userId, action, tableName, recordId, JSON.stringify(req.body), ip]
          );
        }
      } catch (err) {
        console.error('Systemic log recording execution fault:', err);
      }
    });
    next();
  };
};

module.exports = { logAction };