const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let cart = [];

// Add item to cart
app.post('/cart', (req, res) => {
  const item = req.body;
  if (!item || !item.id || !item.name) {
    return res.status(400).json({ error: 'Item must have id and name' });
  }
  cart.push(item);
  res.status(201).json({ message: 'Item added to cart', cart });
});

// Remove item from cart by ID
app.delete('/cart/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = cart.length;
  cart = cart.filter(item => item.id !== id);

  if (cart.length === initialLength) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json({ message: 'Item removed from cart', cart });
});

// Get current cart
app.get('/cart', (req, res) => {
  res.json(cart);
});

app.listen(port, () => {
  console.log(`Cart service running at http://localhost:${port}`);
});
