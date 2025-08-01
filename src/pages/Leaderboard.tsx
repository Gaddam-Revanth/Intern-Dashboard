import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const leaderboardData = [
  { id: '1', name: 'Alex Johnson', referralCode: 'alex2025', totalRaised: 2450, rank: 1 },
  { id: '2', name: 'Sarah Chen', referralCode: 'sarah2025', totalRaised: 1890, rank: 2 },
  { id: '3', name: 'Mike Davis', referralCode: 'mike2025', totalRaised: 1650, rank: 3 },
  { id: '4', name: 'Emma Wilson', referralCode: 'emma2025', totalRaised: 1420, rank: 4 },
  { id: '5', name: 'James Brown', referralCode: 'james2025', totalRaised: 1250, rank: 5 },
  { id: '6', name: 'Lisa Garcia', referralCode: 'lisa2025', totalRaised: 1100, rank: 6 },
  { id: '7', name: 'Tom Anderson', referralCode: 'tom2025', totalRaised: 950, rank: 7 },
  { id: '8', name: 'Amy Taylor', referralCode: 'amy2025', totalRaised: 820, rank: 8 },
];

export const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-muted-foreground font-bold">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      return "default";
    }
    return "secondary";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Leaderboard
                </h1>
                <p className="text-muted-foreground">See how you rank among all interns</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboardData.map((intern, index) => (
                  <div
                    key={intern.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                      user?.id === intern.id
                        ? 'bg-primary/10 border-primary/20 shadow-glow/20'
                        : 'bg-secondary/20 border-border/50 hover:bg-secondary/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10">
                        {getRankIcon(intern.rank)}
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {intern.name}
                          {user?.id === intern.id && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              You
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground font-mono">
                          {intern.referralCode}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${intern.totalRaised.toLocaleString()}</p>
                      <Badge variant={getRankBadge(intern.rank)}>
                        Rank #{intern.rank}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
              <CardContent className="pt-6">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-semibold">Total Raised</h3>
                <p className="text-2xl font-bold text-primary">
                  ${leaderboardData.reduce((sum, intern) => sum + intern.totalRaised, 0).toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
              <CardContent className="pt-6">
                <Medal className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Average per Intern</h3>
                <p className="text-2xl font-bold text-primary">
                  ${Math.round(leaderboardData.reduce((sum, intern) => sum + intern.totalRaised, 0) / leaderboardData.length).toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
              <CardContent className="pt-6">
                <Award className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold">Top Performer</h3>
                <p className="text-2xl font-bold text-primary">
                  ${leaderboardData[0].totalRaised.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};