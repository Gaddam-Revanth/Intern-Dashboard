# Intern Dashboard

This project is a simple full-stack intern portal designed to showcase basic functionalities including user authentication, a personalized dashboard, and a leaderboard.

## Features

### Frontend
- **Dummy Login/Signup:** A basic authentication system without actual backend authentication, allowing users to log in and sign up with dummy credentials.
- **Dashboard:** Displays intern-specific information:
  - Intern Name
  - Dummy Referral Code
  - Total Donations Raised (fetched from the backend)
  - Rewards/Unlockables Section (static display)
- **Leaderboard:** A page displaying a list of interns and their total donations, demonstrating data retrieval from the backend.

### Backend
- **REST API:** A simple Node.js and Express-based REST API that serves dummy data for user profiles, referral codes, donation amounts, and leaderboard entries.
- **Data Storage:** Uses a local `user_data.json` file for persistent storage of dummy user data.

## Technologies Used

### Frontend
- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool for modern web projects.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.

### Backend
- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.

### Data Storage
- **JSON File:** Simple JSON file (`user_data.json`) for storing dummy data.

## Setup and Installation

Follow these steps to set up and run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Gaddam-Revanth/Intern-Dashboard.git
    cd Intern-Dashboard
    ```

2.  **Install Frontend Dependencies:**
    Navigate to the `Intern-Dashboard` directory and install the necessary packages for the frontend:
    ```bash
    npm install
    ```

3.  **Install Backend Dependencies:**
    No separate installation is needed for the backend as it uses Node.js and Express, which are typically managed within the main `package.json`.

## Running the Application

1.  **Start the Backend Server:**
    From the `Intern-Dashboard` directory, run the backend server:
    ```bash
    node server.cjs
    ```
    The backend server will start on `http://localhost:3001`.

2.  **Start the Frontend Development Server:**
    In a new terminal, from the `Intern-Dashboard` directory, start the frontend:
    ```bash
    npm run dev
    ```
    The frontend application will be accessible at `http://localhost:8080/profile` (or a similar address provided by Vite).

## Project Structure

```
Intern-Dashboard/
├── data/
│   └── user_data.json
├── public/
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React Contexts (e.g., AuthContext)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Main application pages (Dashboard, Auth, Leaderboard, etc.)
│   └── main.tsx
├── server.cjs            # Backend Express server
├── package.json          # Project dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

## API Endpoints

The backend provides the following REST API endpoints:

-   `GET /api/users/:userId`: Retrieve user data.
-   `PUT /api/users/:userId`: Update user data.
-   `GET /api/leaderboard`: Retrieve leaderboard data.
-   `GET /api/total`: Retrieve total donations raised.

## Contributing

Feel free to fork the repository and contribute. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the MIT License.