const db = require('../config/db');

exports.getStats = (req, res) => {
  // Example: compute revenue sums by week, month, year
  const stats = {};
  db.get('SELECT IFNULL(SUM(amount),0) as weekCA FROM invoices WHERE created_at >= date("now","-7 day")', [], (err, row) => {
    if (err) return res.status(500).send(err.message);
    stats.week = row.weekCA;
    db.get('SELECT IFNULL(SUM(amount),0) as monthCA FROM invoices WHERE created_at >= date("now","start of month")', [], (err2,row2) => {
      if (err2) return res.status(500).send(err2.message);
      stats.month = row2.monthCA;
      db.get('SELECT IFNULL(SUM(amount),0) as yearCA FROM invoices WHERE created_at >= date("now","start of year")', [], (err3,row3) => {
        if (err3) return res.status(500).send(err3.message);
        stats.year = row3.yearCA;
        db.get('SELECT COUNT(*) as newProspects FROM prospects WHERE created_at >= date("now","-7 day")', [], (err4,row4) => {
          if (err4) return res.status(500).send(err4.message);
          stats.newProspects = row4.newProspects;
          db.get('SELECT COUNT(*) as newClients FROM clients WHERE created_at >= date("now","-7 day")', [], (err5,row5) => {
            if (err5) return res.status(500).send(err5.message);
            stats.newClients = row5.newClients;
            stats.conversionRate = row5.newClients && row4.newProspects ? (row5.newClients / row4.newProspects) * 100 : 0;
            stats.visitors = 0; // placeholder
            res.json(stats);
          });
        });
      });
    });
  });
};
