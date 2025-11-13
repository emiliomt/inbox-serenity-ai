import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Mail, TrendingDown, CheckCircle2, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Subscription {
  id: string;
  sender: string;
  email: string;
  count: number;
  subject: string;
  unsubscribeLink?: string;
  status: "active" | "pending" | "unsubscribed";
}

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Parse imported emails from localStorage (or show demo data)
    const importedEmails = localStorage.getItem('importedEmails');
    
    // Demo subscriptions
    const demoSubs: Subscription[] = [
      {
        id: '1',
        sender: 'Tech Insider',
        email: 'newsletter@techinsider.com',
        count: 12,
        subject: 'Your Weekly Tech Digest 🚀',
        unsubscribeLink: 'https://techinsider.com/unsubscribe',
        status: 'active'
      },
      {
        id: '2',
        sender: 'ShopMart',
        email: 'deals@shopmart.com',
        count: 23,
        subject: 'Flash Sale! 50% OFF Everything',
        unsubscribeLink: 'https://shopmart.com/unsubscribe',
        status: 'active'
      },
      {
        id: '3',
        sender: 'Fitness App',
        email: 'updates@fitnessapp.com',
        count: 8,
        subject: 'Your Monthly Fitness Report',
        unsubscribeLink: 'https://fitnessapp.com/preferences',
        status: 'active'
      },
      {
        id: '4',
        sender: 'Daily Brief',
        email: 'news@dailybrief.com',
        count: 31,
        subject: 'Morning Brief - Top Stories Today',
        unsubscribeLink: 'https://dailybrief.com/unsub',
        status: 'active'
      }
    ];

    setSubscriptions(demoSubs);
  }, []);

  const totalEmails = subscriptions.reduce((sum, sub) => sum + sub.count, 0);
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    const activeIds = subscriptions.filter(s => s.status === 'active').map(s => s.id);
    setSelectedIds(activeIds);
  };

  const handleUnsubscribe = () => {
    if (selectedIds.length === 0) {
      toast({
        title: "No selections",
        description: "Please select at least one subscription to unsubscribe.",
        variant: "destructive",
      });
      return;
    }

    // Update status to pending
    setSubscriptions(prev => 
      prev.map(sub => 
        selectedIds.includes(sub.id) 
          ? { ...sub, status: 'pending' as const }
          : sub
      )
    );

    toast({
      title: "Processing unsubscribe requests",
      description: `Unsubscribing from ${selectedIds.length} sender(s)...`,
    });

    // Simulate unsubscribe process
    setTimeout(() => {
      setSubscriptions(prev => 
        prev.map(sub => 
          selectedIds.includes(sub.id) 
            ? { ...sub, status: 'unsubscribed' as const }
            : sub
        )
      );
      
      toast({
        title: "Successfully unsubscribed!",
        description: `You've been removed from ${selectedIds.length} mailing list(s).`,
      });

      setSelectedIds([]);

      // Navigate to summary after a delay
      setTimeout(() => {
        navigate('/summary');
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Your Subscriptions
            </h1>
            <p className="text-lg text-muted-foreground">
              Review and manage your email subscriptions
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Senders</p>
                  <p className="text-2xl font-bold">{subscriptions.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Emails</p>
                  <p className="text-2xl font-bold">{totalEmails}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold">{activeSubscriptions}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex gap-4 items-center">
            <Button 
              variant="outline"
              onClick={selectAll}
              disabled={activeSubscriptions === 0}
            >
              Select All Active
            </Button>
            <Button 
              onClick={handleUnsubscribe}
              disabled={selectedIds.length === 0}
              className="bg-gradient-accent hover:opacity-90 transition-smooth"
            >
              Unsubscribe Selected ({selectedIds.length})
            </Button>
          </div>

          {/* Subscriptions List */}
          <div className="space-y-4">
            {subscriptions.map(sub => (
              <Card key={sub.id} className="p-6">
                <div className="flex items-start gap-4">
                  {sub.status === 'active' && (
                    <Checkbox
                      checked={selectedIds.includes(sub.id)}
                      onCheckedChange={() => toggleSelection(sub.id)}
                      className="mt-1"
                    />
                  )}
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{sub.sender}</h3>
                        <p className="text-sm text-muted-foreground">{sub.email}</p>
                      </div>
                      <Badge 
                        variant={
                          sub.status === 'unsubscribed' ? 'default' : 
                          sub.status === 'pending' ? 'secondary' : 
                          'outline'
                        }
                      >
                        {sub.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Latest: {sub.subject}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        {sub.count} emails detected
                      </span>
                      {sub.unsubscribeLink && (
                        <a 
                          href={sub.unsubscribeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          Unsubscribe link
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;