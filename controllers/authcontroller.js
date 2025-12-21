const db = require('../config/db');

exports.register = (req, res) => {
    const { id, name, email, password } = req.body;
    const checkQuery = `SELECT * FROM person WHERE id = ? OR email = ?`;
    db.query(checkQuery, [id, email], (err, result) => {
        if (err){ 
            return res.status(500).json({ 
                message: 'Database error', 
                error: err 
            });
        }
        if (result.length > 0) {
            const existingUser = result[0];
            if (existingUser.id === id) {
                return res.status(400).json({
                    message: 'User with this ID already exists' 
                });
            }
            if (existingUser.email === email) {
                return res.status(400).json({
                    message: 'Email already registered' 
                });
            }
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

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  const deleteQuery = `DELETE FROM person WHERE id = ?`;
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ 
        message: 'Database error', 
        error: err 
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.json({ 
      message: 'User deleted successfully', 
      deletedId: id 
    });
  });
};