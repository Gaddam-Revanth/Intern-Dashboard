const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data', 'user_data.json');

// Helper function to read data
const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return { users: [], leaderboard: [], totalDonationsRaised: 0 };
  }
};

// Helper function to write data
const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data file:', error);
  }
};

// Get all user data
app.get('/api/users', (req, res) => {
  const data = readData();
  res.json(data.users);
});

// Get user data by ID
app.get('/api/users/:id', (req, res) => {
  const data = readData();
  const user = data.users.find(u => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Get leaderboard data
app.get('/api/leaderboard', (req, res) => {
  const data = readData();
  res.json(data.leaderboard);
});

// Get total donations raised
app.get('/api/total-donations', (req, res) => {
  const data = readData();
  res.json({ totalDonationsRaised: data.totalDonationsRaised });
});

// Update user data (example: for profile updates)
app.put('/api/users/:id', (req, res) => {
  const data = readData();
  const userIndex = data.users.findIndex(u => u.id === req.params.id);
  if (userIndex !== -1) {
    data.users[userIndex] = { ...data.users[userIndex], ...req.body };
    writeData(data);
    res.json(data.users[userIndex]);
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});