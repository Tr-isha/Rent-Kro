const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Show signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle signup POST
router.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    // Save user ID only in session
    req.session.userId = user._id;

    res.redirect('/');
  } catch (err) {
    res.status(400).send('Signup error: ' + err.message);
  }
});

// Show login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login POST
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Simple password check; consider hashing in real app
  if (!user || user.password !== password) {
    return res.status(401).send('Invalid email or password');
  }

  // Store user ID in session
  req.session.userId = user._id;

  res.redirect('/');
});

// Show deposit form (only logged-in users)
router.get('/deposit', (req, res) => {
  if (!req.session.userId) return res.redirect('/users/login');
  res.render('deposit');
});

// Handle deposit POST
router.post('/deposit', async (req, res) => {
  if (!req.session.userId) return res.status(401).send('Not logged in');

  const userId = req.session.userId;
  const { amount } = req.body;
  const user = await User.findById(userId);

  if (!user) return res.status(404).send('User not found');

  user.deposit += Number(amount);
  user.wallet += Number(amount);
  user.trustFactor = Math.min(10, Math.floor(user.deposit / 1000));
  await user.save();

  res.send('Deposit updated and Trust Factor recalculated');
});

module.exports = router;
