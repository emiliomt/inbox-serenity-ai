/**
 * Email Parser Service
 * Uses Claude AI to extract subscription information from email content
 */

export interface ParsedEmail {
  sender: string;
  email: string;
  subject: string;
  unsubscribeLink?: string;
  body: string;
}

export interface Subscription {
  id: string;
  sender: string;
  email: string;
  count: number;
  subject: string;
  unsubscribeLink?: string;
  status: "active" | "pending" | "unsubscribed";
  emails: ParsedEmail[];
}

/**
 * Parse email text using Claude AI
 */
export async function parseEmailsWithAI(emailText: string): Promise<ParsedEmail[]> {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [
          {
            role: "user",
            content: `You are an email parser. Extract subscription information from the following email(s).

Email content:
${emailText}

For each email found, extract:
1. Sender name (company/organization name)
2. Sender email address
3. Subject line
4. Unsubscribe link (look for "unsubscribe", "preferences", "manage subscription" links)
5. Email body (abbreviated)

IMPORTANT: Respond ONLY with valid JSON in this exact format, with NO additional text or markdown:
{
  "emails": [
    {
      "sender": "Company Name",
      "email": "sender@example.com",
      "subject": "Email subject",
      "unsubscribeLink": "https://example.com/unsubscribe",
      "body": "Brief email body excerpt"
    }
  ]
}

If you find multiple emails (separated by --- or clear breaks), include all of them in the array.
DO NOT include any text outside the JSON structure. NO markdown code blocks. Only pure JSON.`
          }
        ]
      })
    });

    const data = await response.json();
    let responseText = data.content[0].text;
    
    // Strip markdown code blocks if present
    responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    const parsed = JSON.parse(responseText);
    return parsed.emails || [];
  } catch (error) {
    console.error("Error parsing emails with AI:", error);
    throw new Error("Failed to parse emails. Please check the format and try again.");
  }
}

/**
 * Group parsed emails into subscriptions
 */
export function groupIntoSubscriptions(parsedEmails: ParsedEmail[]): Subscription[] {
  const subscriptionMap = new Map<string, Subscription>();

  parsedEmails.forEach((email) => {
    const key = email.email.toLowerCase();
    
    if (subscriptionMap.has(key)) {
      const sub = subscriptionMap.get(key)!;
      sub.count++;
      sub.emails.push(email);
      // Update unsubscribe link if this email has one and previous didn't
      if (email.unsubscribeLink && !sub.unsubscribeLink) {
        sub.unsubscribeLink = email.unsubscribeLink;
      }
    } else {
      subscriptionMap.set(key, {
        id: Math.random().toString(36).substr(2, 9),
        sender: email.sender,
        email: email.email,
        count: 1,
        subject: email.subject,
        unsubscribeLink: email.unsubscribeLink,
        status: "active",
        emails: [email]
      });
    }
  });

  return Array.from(subscriptionMap.values());
}

/**
 * Fallback parser for when AI is not available
 */
export function parseEmailsBasic(emailText: string): ParsedEmail[] {
  const emails: ParsedEmail[] = [];
  const emailSections = emailText.split(/\n---\n|\n\n---\n\n/);

  emailSections.forEach((section) => {
    const lines = section.trim().split('\n');
    if (lines.length === 0) return;

    const email: Partial<ParsedEmail> = {
      body: section
    };

    // Extract From
    const fromLine = lines.find(l => l.toLowerCase().startsWith('from:'));
    if (fromLine) {
      const match = fromLine.match(/from:\s*(.+?)(?:\s*<(.+?)>)?$/i);
      if (match) {
        email.sender = match[1].trim();
        email.email = match[2] || match[1].trim();
      }
    }

    // Extract Subject
    const subjectLine = lines.find(l => l.toLowerCase().startsWith('subject:'));
    if (subjectLine) {
      email.subject = subjectLine.replace(/^subject:\s*/i, '').trim();
    }

    // Extract Unsubscribe link
    const unsubMatch = section.match(/unsubscribe[:\s]+?(https?:\/\/[^\s<>]+)/i);
    if (unsubMatch) {
      email.unsubscribeLink = unsubMatch[1];
    }

    if (email.email && email.sender) {
      emails.push(email as ParsedEmail);
    }
  });

  return emails;
}
