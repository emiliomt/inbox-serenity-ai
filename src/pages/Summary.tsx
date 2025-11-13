import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, TrendingDown, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Summary = () => {
  // Mock data - in real app would come from state/props
  const unsubscribedCount = 4;
  const estimatedEmailsPerMonth = 74;
  const percentageReduction = 82;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-gradient-accent flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-accent-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Inbox Cleaned! 🎉
            </h1>
            <p className="text-lg text-muted-foreground">
              You've successfully decluttered your inbox.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center space-y-2">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <p className="text-3xl font-bold">{unsubscribedCount}</p>
              <p className="text-sm text-muted-foreground">Lists Unsubscribed</p>
            </Card>

            <Card className="p-6 text-center space-y-2">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-accent" />
                </div>
              </div>
              <p className="text-3xl font-bold">{estimatedEmailsPerMonth}</p>
              <p className="text-sm text-muted-foreground">Fewer Emails/Month</p>
            </Card>

            <Card className="p-6 text-center space-y-2">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold">{percentageReduction}%</p>
              <p className="text-sm text-muted-foreground">Noise Reduction</p>
            </Card>
          </div>

          {/* AI Summary */}
          <Card className="p-8 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              <h2 className="text-xl font-semibold">AI Summary</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Great work! You've successfully unsubscribed from <strong className="text-foreground">{unsubscribedCount} mailing lists</strong> that 
                were sending you approximately <strong className="text-foreground">{estimatedEmailsPerMonth} emails per month</strong>.
              </p>
              <p>
                This represents an <strong className="text-foreground">{percentageReduction}% reduction</strong> in your inbox noise. 
                You'll now have more time to focus on emails that actually matter.
              </p>
              <p>
                The unsubscribed lists included high-volume senders like promotional emails, 
                daily newsletters, and automated notifications. Your inbox will be noticeably 
                cleaner starting today.
              </p>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-8 space-y-4 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <h2 className="text-xl font-semibold">What's Next?</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>Monitor your inbox over the next week to confirm the reduction</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>Import more emails anytime to find additional subscriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>Set up email filters to catch any remaining unwanted senders</span>
              </li>
            </ul>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 transition-smooth">
              <Link to="/import">Import More Emails</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;