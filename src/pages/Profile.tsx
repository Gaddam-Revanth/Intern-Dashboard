import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    mobile: '',
    referralCount: 0,
    progress: 0,
    totalRaisedMonthly: 0,
  });
  const [monthlyRaisedData, setMonthlyRaisedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users/user1'); // Assuming 'user1' is the current user ID
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUser({
          username: data.username,
          email: data.email,
          mobile: data.mobile,
          referralCount: data.referralCount,
          progress: data.progress || 0, // Assuming progress might not be in dummy data
          totalRaisedMonthly: data.amountRaised,
        });
        setMonthlyRaisedData(data.monthlyRaised || []);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/users/user1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert('Profile updated successfully!');
    } catch (e: any) {
      alert(`Failed to update profile: ${e.message}`);
    }
  };

  const handleChangePassword = () => {
    alert('Change password functionality not implemented yet.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              User Profile
            </h1>
            <div></div> {/* Spacer to balance the header */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading && <p className="text-center">Loading profile data...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* User Information Card */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={user.username} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user.email} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input id="mobile" value={user.mobile} onChange={handleInputChange} />
                </div>
                <Button onClick={handleSave} className="w-full">Save Changes</Button>
              </CardContent>
            </Card>

        {/* Change Password Card */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button onClick={handleChangePassword} className="w-full">Change Password</Button>
          </CardContent>
        </Card>

            {/* Stats Card */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Referral Count</Label>
                  <p className="text-2xl font-bold">{user.referralCount}</p>
                </div>
                <div>
                  <Label>Your Progress</Label>
                  <Progress value={user.progress} className="w-[60%]" />
                  <p className="text-sm text-muted-foreground mt-1">{user.progress}% Complete</p>
                </div>
                <div>
                  <Label>Total Raised This Month</Label>
                  <p className="text-2xl font-bold">${user.totalRaisedMonthly}</p>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Raised Chart Card */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Raised Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={monthlyRaisedData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};