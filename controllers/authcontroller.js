const db = require('../config/db');

exports.register = (req, res) => {
    const { id, name, email, password } = req.body;
    const checkQuery = `SELECT * FROM person WHERE id = ?`;
    db.query(checkQuery, [id], (err, result) => {
        if (err){ 
            return res.status(500).json({ 
                message: 'Database error', 
                error: err 
            });
        }
        if (result.length > 0) {
            return res.status(400).json({
                message: 'User with this ID already exists' 
            });
        }
        const insertQuery = `INSERT INTO person (id, name, email, password) VALUES (?, ?, ?, ?)`;
        db.query(insertQuery, [id, name, email, password], (err2, result2) => {
            if (err2){ 
                return res.status(500).json({ 
                    message: 'Database error', 
                    error: err2 
                });
            }
            res.status(201).json({ 
                message: 'User registered successfully' 
            });
        });
    });
};
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM person WHERE email = ? AND password = ?`;
  db.query(query, [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', user: result[0] });
  });
};