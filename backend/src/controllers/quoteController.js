const db = require('../config/db');

exports.getAll = (req, res) => {
  db.all('SELECT * FROM quotes', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
};

exports.create = (req, res) => {
  const { client_id, amount, status } = req.body;
  db.run('INSERT INTO quotes (client_id, amount, status) VALUES (?, ?, ?)', [client_id, amount, status], function(err) {
    if (err) return res.status(500).send(err.message);
    res.json({ id: this.lastID, client_id, amount, status });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { client_id, amount, status } = req.body;
  db.run('UPDATE quotes SET client_id=?, amount=?, status=? WHERE id=?', [client_id, amount, status, id], function(err) {
    if (err) return res.status(500).send(err.message);
    res.json({ id, client_id, amount, status });
  });
};

exports.remove = (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM quotes WHERE id=?', [id], function(err) {
    if (err) return res.status(500).send(err.message);
    res.json({ deleted: id });
  });
};
