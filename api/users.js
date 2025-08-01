import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataFilePath = join(__dirname, '..', 'data', 'user_data.json');

// Helper function to read data
const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error.message, error.stack);
    return { users: [], leaderboard: [], totalDonationsRaised: 0 };
  }
};

// Helper function to write data
const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data file:', error.message, error.stack);
  }
};

const router = express.Router();

router.get('/', (req, res) => {
  const data = readData();
  res.json(data.users);
});

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const data = readData();
  const user = data.users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

router.put('/:userId', (req, res) => {
  const userId = req.params.userId;
  const data = readData();
  const userIndex = data.users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    data.users[userIndex] = { ...data.users[userIndex], ...req.body };
    writeData(data);
    res.json(data.users[userIndex]);
  } else {
    res.status(404).send('User not found');
  }
});

export default router;