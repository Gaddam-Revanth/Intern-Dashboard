const path = require('path');
const fs = require('fs');

const dataFilePath = path.join(__dirname, '..', 'data', 'user_data.json');

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

module.exports = (req, res) => {
  if (req.method === 'GET') {
    const data = readData();
    res.json(data.leaderboard);
  } else {
    res.status(405).send('Method Not Allowed');
  }
};