const db = require('../config/db');

exports.getAll = (req, res) => {
  db.all('SELECT * FROM prospects', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
};

exports.create = (req, res) => {
  const { name, email, phone } = req.body;
  db.run('INSERT INTO prospects (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], function(err) {
    if (err) return res.status(500).send(err.message);
    res.json({ id: this.lastID, name, email, phone });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  db.run('UPDATE prospects SET name=?, email=?, phone=? WHERE id=?', [name, email, phone, id], function(err) {
    if (err) return res.status(500).send(err.message);
    res.json({ id, name, email, phone });
  });
};

exports.remove = (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM prospects WHERE id=?', [id], function(err) {
    if (err) return res.status(500).send(err.message);
    res.json({ deleted: id });
  });
};
