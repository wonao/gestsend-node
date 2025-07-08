const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db");
const JWT_SECRET = require("../config/jwt");

exports.register = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function(err) {
    if (err) {
      return res.status(500).send("There was a problem registering the user.");
    }
    const token = jwt.sign({ id: this.lastID }, JWT_SECRET, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token: token });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token: token });
  });
};

