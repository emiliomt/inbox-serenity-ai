import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Zap, TrendingDown, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Take Back Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Inbox
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop drowning in newsletters. InboxUnsub AI finds your subscriptions
              and automates unsubscribing—all with just a few clicks.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 transition-smooth">
                <Link to="/import">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/dashboard">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6 space-y-4 border-border hover:shadow-md transition-smooth">
            <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">AI Detection</h3>
            <p className="text-muted-foreground">
              Paste emails and let AI instantly identify senders and unsubscribe links.
            </p>
          </Card>

          <Card className="p-6 space-y-4 border-border hover:shadow-md transition-smooth">
            <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center">
              <Zap className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Batch Unsubscribe</h3>
            <p className="text-muted-foreground">
              Select multiple senders and unsubscribe from all at once with automated workflows.
            </p>
          </Card>

          <Card className="p-6 space-y-4 border-border hover:shadow-md transition-smooth">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Clean Inbox</h3>
            <p className="text-muted-foreground">
              Get instant stats on how much noise you've eliminated from your inbox.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <div className="space-y-8 text-left">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Import Your Emails</h3>
                  <p className="text-muted-foreground">
                    Paste raw email text or upload a file with sample emails.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Review Subscriptions</h3>
                  <p className="text-muted-foreground">
                    See all detected senders grouped with stats and unsubscribe links.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Bulk Unsubscribe</h3>
                  <p className="text-muted-foreground">
                    Select senders and let AI handle the unsubscribe process automatically.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-semibold">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Enjoy Your Clean Inbox</h3>
                  <p className="text-muted-foreground">
                    Get a summary of what was cleaned and how much inbox noise you've eliminated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Declutter?
          </h2>
          <p className="text-xl text-muted-foreground">
            Start cleaning your inbox today—no signup required for the demo.
          </p>
          <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 transition-smooth">
            <Link to="/import">Try InboxUnsub AI Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;