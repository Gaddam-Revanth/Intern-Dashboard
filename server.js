import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'dist' directory (for frontend build)
app.use(express.static(join(__dirname, 'dist')));

// API routes
import usersApi from './api/users.js';
import leaderboardApi from './api/leaderboard.js';
import totalDonationsApi from './api/total-donations.js';

app.use('/api/users', usersApi);
app.use('/api/leaderboard', leaderboardApi);
app.use('/api/total-donations', totalDonationsApi);

// Catch-all to serve index.html for any unhandled routes (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});