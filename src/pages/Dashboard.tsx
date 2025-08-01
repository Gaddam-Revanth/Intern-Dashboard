import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, BarChart3, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardStats } from '@/components/DashboardStats';
import { ReferralCard } from '@/components/ReferralCard';
import { RewardsSection } from '@/components/RewardsSection';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Intern Dashboard
              </h1>
              <p className="text-muted-foreground">Welcome back, {user.name}!</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/leaderboard')}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Leaderboard
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Profile
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Grid */}
          <DashboardStats />

          {/* Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ReferralCard />
            <RewardsSection />
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Keep sharing your referral code to climb the leaderboard and unlock amazing rewards!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};