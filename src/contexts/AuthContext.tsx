import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  totalRaised: number;
  rank: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for the dashboard
const mockUsers: User[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', referralCode: 'alex2025', totalRaised: 2450, rank: 1 },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', referralCode: 'sarah2025', totalRaised: 1890, rank: 2 },
  { id: '3', name: 'Mike Davis', email: 'mike@example.com', referralCode: 'mike2025', totalRaised: 1650, rank: 3 },
  { id: '4', name: 'Emma Wilson', email: 'emma@example.com', referralCode: 'emma2025', totalRaised: 1420, rank: 4 },
  { id: '5', name: 'James Brown', email: 'james@example.com', referralCode: 'james2025', totalRaised: 1250, rank: 5 },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email (mock authentication)
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user with mock data
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      referralCode: `${name.toLowerCase().replace(/\s+/g, '')}2025`,
      totalRaised: Math.floor(Math.random() * 500) + 100,
      rank: mockUsers.length + 1
    };
    
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};