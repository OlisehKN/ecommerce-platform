const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 4000;

app.use(express.json());

let orders = [];

// Create a new order
app.post('/orders', (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Items must be an array' });
  }

  const newOrder = {
    id: uuidv4(),
    items,
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Get all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Get an order by ID
app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

app.listen(port, () => {
  console.log(`Order service running at http://localhost:${port}`);
});
