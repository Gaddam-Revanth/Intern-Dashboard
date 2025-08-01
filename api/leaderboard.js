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
    console.error('Error reading data file:', error);
    return { users: [], leaderboard: [], totalDonationsRaised: 0 };
  }
};

const router = express.Router();

router.get('/', (req, res) => {
  const data = readData();
  res.json(data.leaderboard);
});

export default router;