// orderItemsRouter.js

const express = require('express');
const router = express.Router();
const db = require('./db'); // db bağlantısı

// Middleware
router.use(express.json());

// Get all order items
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM orderitems';
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        throw err;
      }
      res.json(result);
    });
});

// Get a single order item by id
router.get('/:orderItemId', (req, res) => {
    const orderItemId = req.params.orderItemId;
    const sql = 'SELECT * FROM orderitems WHERE order_item_id = ?';
    db.query(sql, [orderItemId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        throw err;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'Order item not found' });
      } else {
        res.json(result[0]);
      }
    });
});

// Create a new order item
router.post('/', (req, res) => {
    const { customer_order_id, product_name, quantity, price_per_unit } = req.body;
    const sql = 'INSERT INTO orderitems (customer_order_id, product_name, quantity, price_per_unit) VALUES (?, ?, ?, ?)';
    db.query(sql, [customer_order_id, product_name, quantity, price_per_unit], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        throw err;
      }
      res.json({
        message: 'Order item added successfully',
        orderItemId: result.insertId,
        product_name: product_name,
        quantity: quantity,
        price_per_unit: price_per_unit
      });
      
    });
});

// Update an existing order item
router.put('/:orderItemId', (req, res) => {
    const orderItemId = req.params.orderItemId;
    const { product_name, quantity, price_per_unit } = req.body;
    const sql = 'UPDATE orderitems SET product_name = ?, quantity = ?, price_per_unit = ? WHERE order_item_id = ?';
    db.query(sql, [ product_name, quantity, price_per_unit, orderItemId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        throw err;
      }
      res.json({ message: 'Order item updated successfully', orderItemId });
    });
});

// Delete an existing order item
router.delete('/:orderItemId', (req, res) => {
    const orderItemId = req.params.orderItemId;
    const sql = 'DELETE FROM orderitems WHERE order_item_id = ?';
    db.query(sql, [orderItemId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        throw err;
      }
      res.json({ message: 'Order item deleted successfully', orderItemId });
    });
});

module.exports = router;
