// customerorderRouter.js

const express = require('express');
const router = express.Router();
const db = require('./db'); // Database connection

// Middleware
router.use(express.json());

// Get all customer orders
router.get('/', (req, res) => {
    const sql = "SELECT * FROM CustomerOrder";
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" });
            throw err;
        }
        res.json(result);
    });
});

// Get a specific customer order by ID
router.get('/:customerOrderId', (req, res) => {
    const customerOrderId = req.params.customerOrderId;
    const sql = 'SELECT * FROM CustomerOrder WHERE customer_order_id = ?';
    db.query(sql, [customerOrderId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        throw err;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Customer order not found' });
        return;
      }
      res.json(result[0]);
    });
});

// Create a new customer order
router.post('/', (req, res) => {
    const { customer_name, address, order_date } = req.body;
    const sql = "INSERT INTO CustomerOrder (customer_name, address, order_date) VALUES (?, ?, ?)";
    db.query(sql, [customer_name, address, order_date], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" });
            throw err;
        }
        res.json({ message: "Customer order added successfully", customerOrderId: result.insertId });
    });
});

// Update an existing customer order
router.put('/:customerOrderId', (req, res) => {
    const customerOrderId = req.params.customerOrderId;
    const { customer_name, address, order_date } = req.body;
    const sql = "UPDATE CustomerOrder SET customer_name = ?, address = ?, order_date = ? WHERE customer_order_id = ?";
    db.query(sql, [customer_name, address, order_date, customerOrderId], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" });
            throw err;
        }
        if (result.affectedRows > 0) {
            res.json({ message: "Customer order updated successfully" });
        } else {
            res.status(404).json({ error: "Customer order not found" });
        }
    });
});

// Delete an existing customer order
router.delete('/:customerOrderId', (req, res) => {
    const customerOrderId = req.params.customerOrderId;
    const sql = "DELETE FROM CustomerOrder WHERE customer_order_id = ?";
    db.query(sql, [customerOrderId], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" });
            throw err;
        }
        if (result.affectedRows > 0) {
            res.json({ message: "Customer order deleted successfully" });
        } else {
            res.status(404).json({ error: "Customer order not found" });
        }
    });
});

module.exports = router;
