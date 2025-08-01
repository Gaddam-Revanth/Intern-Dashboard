import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, Trophy, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardStats: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const stats = [
    {
      title: "Total Raised",
      value: `$${user.totalRaised.toLocaleString()}`,
      icon: DollarSign,
      description: "This month",
      color: "text-primary"
    },
    {
      title: "Current Rank",
      value: `#${user.rank}`,
      icon: Trophy,
      description: "Among all interns",
      color: "text-accent"
    },
    {
      title: "Referrals",
      value: Math.floor(user.totalRaised / 50),
      icon: Users,
      description: "People referred",
      color: "text-primary"
    },
    {
      title: "Goal Progress",
      value: `${Math.round((user.totalRaised / 3000) * 100)}%`,
      icon: Target,
      description: "To next reward",
      color: "text-accent"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow/20 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};