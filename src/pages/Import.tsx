import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Import = () => {
  const [emailText, setEmailText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleProcess = () => {
    if (!emailText.trim()) {
      toast({
        title: "No content",
        description: "Please paste some email content first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      // Store the email text in localStorage for demo purposes
      localStorage.setItem('importedEmails', emailText);
      
      toast({
        title: "Processing complete!",
        description: "Found subscriptions. Redirecting to dashboard...",
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 2000);
  };

  const loadSampleData = () => {
    const sampleEmails = `From: newsletter@techinsider.com
Subject: Your Weekly Tech Digest 🚀
Hi there! Here's what's trending this week in tech...
Unsubscribe: https://techinsider.com/unsubscribe

---

From: deals@shopmart.com
Subject: Flash Sale! 50% OFF Everything
Don't miss out on our biggest sale of the year!
Unsubscribe: https://shopmart.com/unsubscribe

---

From: updates@fitnessapp.com
Subject: Your Monthly Fitness Report
You've made great progress this month! Keep it up...
Unsubscribe: https://fitnessapp.com/preferences

---

From: news@dailybrief.com
Subject: Morning Brief - Top Stories Today
Good morning! Here are today's headlines...
Unsubscribe: https://dailybrief.com/unsub`;

    setEmailText(sampleEmails);
    toast({
      title: "Sample data loaded",
      description: "You can now process these sample emails.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Import Your Emails
            </h1>
            <p className="text-lg text-muted-foreground">
              Paste email content below or upload a file. AI will extract senders and unsubscribe links.
            </p>
          </div>

          <Card className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Email Content
                </label>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={loadSampleData}
                >
                  Load Sample Data
                </Button>
              </div>
              <Textarea
                placeholder="Paste your email content here...&#10;&#10;You can paste multiple emails separated by '---'"
                className="min-h-[300px] font-mono text-sm"
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleProcess}
                disabled={isProcessing}
                className="flex-1 bg-gradient-primary hover:opacity-90 transition-smooth"
                size="lg"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Process Emails
                  </>
                )}
              </Button>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium">Tips:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Paste raw email text including headers (From, Subject)</li>
                <li>Separate multiple emails with "---"</li>
                <li>Include the email body to help AI find unsubscribe links</li>
                <li>Or click "Load Sample Data" to try with demo emails</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Import;