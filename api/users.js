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

// Helper function to write data
const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data file:', error);
  }
};

module.exports = (req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/api/users') {
      const data = readData();
      res.json(data.users);
    } else if (req.url.startsWith('/api/users/')) {
      const userId = req.url.split('/').pop();
      const data = readData();
      const user = data.users.find(u => u.id === userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('User not found');
      }
    } else {
      res.status(404).send('Not Found');
    }
  } else if (req.method === 'PUT') {
    if (req.url.startsWith('/api/users/')) {
      const userId = req.url.split('/').pop();
      const data = readData();
      const userIndex = data.users.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        data.users[userIndex] = { ...data.users[userIndex], ...req.body };
        writeData(data);
        res.json(data.users[userIndex]);
      } else {
        res.status(404).send('User not found');
      }
    } else {
      res.status(404).send('Not Found');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};