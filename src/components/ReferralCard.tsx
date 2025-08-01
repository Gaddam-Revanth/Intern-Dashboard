import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Share2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const ReferralCard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const referralLink = `https://internships.company.com/join?ref=${user.referralCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join our internship program!',
          text: `Use my referral code ${user.referralCode} to join our amazing internship program!`,
          url: referralLink,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-primary" />
          Your Referral Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant="outline" className="text-2xl font-mono px-4 py-2 bg-primary/10 border-primary/20">
            {user.referralCode}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Referral Link:</p>
          <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-md">
            <code className="flex-1 text-xs overflow-hidden text-ellipsis">
              {referralLink}
            </code>
            <Button
              size="sm"
              variant="ghost"
              onClick={copyToClipboard}
              className="h-8 w-8 p-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={copyToClipboard} 
            variant="outline" 
            className="flex-1"
            disabled={copied}
          >
            {copied ? "Copied!" : "Copy Link"}
          </Button>
          <Button 
            onClick={shareReferral} 
            className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            Share
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Earn $50 for each successful referral!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};