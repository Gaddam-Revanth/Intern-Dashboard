import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Star, Crown, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const RewardsSection: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const rewards = [
    {
      title: "Coffee Voucher",
      description: "Free coffee for a week",
      threshold: 500,
      icon: Gift,
      color: "bg-orange-500/20 text-orange-500",
      unlocked: user.totalRaised >= 500
    },
    {
      title: "Tech Swag Pack",
      description: "Branded hoodie & accessories",
      threshold: 1000,
      icon: Star,
      color: "bg-blue-500/20 text-blue-500",
      unlocked: user.totalRaised >= 1000
    },
    {
      title: "Mentor Session",
      description: "1-on-1 with senior leadership",
      threshold: 2000,
      icon: Crown,
      color: "bg-purple-500/20 text-purple-500",
      unlocked: user.totalRaised >= 2000
    },
    {
      title: "Premium Internship",
      description: "Fast-track to full-time offer",
      threshold: 3000,
      icon: Zap,
      color: "bg-primary/20 text-primary",
      unlocked: user.totalRaised >= 3000
    }
  ];

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Rewards & Unlockables
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rewards.map((reward, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${reward.color}`}>
                  <reward.icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">{reward.title}</h4>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge 
                  variant={reward.unlocked ? "default" : "secondary"}
                  className={reward.unlocked ? "bg-primary" : ""}
                >
                  {reward.unlocked ? "Unlocked" : `$${reward.threshold}`}
                </Badge>
              </div>
            </div>
            <Progress 
              value={Math.min((user.totalRaised / reward.threshold) * 100, 100)} 
              className="h-2"
            />
            {!reward.unlocked && (
              <p className="text-xs text-muted-foreground text-right">
                ${reward.threshold - user.totalRaised} more to unlock
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};