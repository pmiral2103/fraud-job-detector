import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Shield,
  AlertTriangle,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { Button, Card } from '../components/common';
import { mockChatMessages, suggestedQuestions } from '../data/mockData';
import { cn } from '../utils/helpers';
import type { ChatMessage } from '../types';

export function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex gap-6">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <Card className="px-6 py-4 mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-xl">
              <Bot className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="font-semibold text-neutral-900">JobShield AI Assistant</h2>
              <p className="text-xs text-neutral-500">
                Ask me anything about job fraud detection
              </p>
            </div>
          </div>
        </Card>

        {/* Messages */}
        <Card className="flex-1 overflow-hidden flex flex-col" padding="none">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-600" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[75%] rounded-2xl px-4 py-3',
                    message.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-md'
                      : 'bg-neutral-100 text-neutral-800 rounded-bl-md'
                  )}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-neutral-600" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-600" />
                </div>
                <div className="bg-neutral-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-neutral-200 p-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about job fraud detection..."
                className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm
                  placeholder:text-neutral-400 focus:bg-white focus:border-primary-500
                  focus:ring-2 focus:ring-primary-500/10 focus:outline-none transition-all"
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                leftIcon={<Send className="w-4 h-4" />}
              >
                Send
              </Button>
            </form>
          </div>
        </Card>
      </div>

      {/* Sidebar with Suggested Questions */}
      <div className="w-80 flex-shrink-0 space-y-4 hidden lg:block">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <h3 className="font-semibold text-neutral-900 text-sm">
              Suggested Questions
            </h3>
          </div>
          <div className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                className="w-full text-left text-sm text-neutral-600 px-3 py-2.5 rounded-lg
                  hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-primary-600" />
            <h3 className="font-semibold text-neutral-900 text-sm">Quick Help</h3>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => handleQuestionClick('What is a fraud score?')}
              className="flex items-start gap-3 w-full text-left p-2 rounded-lg hover:bg-neutral-50"
            >
              <Shield className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-neutral-600">Understanding fraud scores</span>
            </button>
            <button
              onClick={() => handleQuestionClick('What are common red flags in job postings?')}
              className="flex items-start gap-3 w-full text-left p-2 rounded-lg hover:bg-neutral-50"
            >
              <AlertTriangle className="w-4 h-4 text-warning-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-neutral-600">Common red flags</span>
            </button>
            <button
              onClick={() => handleQuestionClick('How do I report a scam?')}
              className="flex items-start gap-3 w-full text-left p-2 rounded-lg hover:bg-neutral-50"
            >
              <BookOpen className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-neutral-600">Reporting scams</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function generateAIResponse(input: string): ChatMessage {
  const lowerInput = input.toLowerCase();

  let response = '';

  if (lowerInput.includes('salary') || lowerInput.includes('pay')) {
    response = `**Salary Analysis Insights**

When evaluating salary offers, look out for:

**Red Flags:**
- Salary significantly above market rate (often 50%+ higher)
- Vague salary ranges without specifics
- "Up to" language suggesting variable/unrealistic pay
- Asking for bank details before employment

**Green Flags:**
- Salary within 10-20% of market average
- Clear compensation breakdown (base, bonus, equity)
- Transparent discussion about pay bands

Would you like me to analyze a specific salary offer?`;
  } else if (lowerInput.includes('red flag') || lowerInput.includes('warning') || lowerInput.includes('suspicious')) {
    response = `**Common Job Scam Red Flags**

**1. Communication Red Flags**
- Personal email addresses (Gmail, Yahoo, Hotmail)
- Poor grammar and spelling errors
- Urgent pressure to respond immediately
- Conducted exclusively via chat/text

**2. Payment Red Flags**
- Request for payment or fees upfront
- Asking for bank details early
- Wire transfer requirements
- "Check cashing" schemes

**3. Job Posting Red Flags**
- "No experience needed" with high salary
- Vague job requirements
- Company cannot be verified independently
- Role sounds too good to be true

**4. Recruitment Process Red Flags**
- Job offered without interview
- Immediate offer after brief contact
- Requests for personal documents (SSN, ID) early
- No video calls or in-person meetings

If you've encountered any of these, I recommend stopping communication and reporting the posting.`;
  } else if (lowerInput.includes('report') || lowerInput.includes('scam')) {
    response = `**How to Report Job Scams**

**1. Report to the Platform**
- Indeed, LinkedIn, Glassdoor all have report functions
- Flag the posting as fraudulent
- Include details about why it's suspicious

**2. File with Authorities**
- **FTC**: reportfraud.ftc.gov
- **IC3**: ic3.gov (FBI cybercrime division)
- **State AG**: Contact your state's Attorney General

**3. Protect Yourself**
- Document all communications (screenshots, emails)
- Don't delete anything - it's evidence
- Warn others on job forums if appropriate

**4. If You Shared Information**
- Place fraud alerts with credit bureaus
- Monitor your accounts closely
- Change any compromised passwords

Would you like more specific guidance on any of these steps?`;
  } else {
    response = `That's a great question about job fraud. Let me help you understand this better.

The key to staying safe is verifying job opportunities through multiple channels:

1. **Research the company** - Check LinkedIn, official websites, employee reviews
2. **Verify the recruiter** - Email domain should match the company
3. **Assess the offer** - Salary should be realistic for the role/location
4. **Check the process** - Legitimate jobs have structured interviews

Is there a specific job posting you'd like me to help analyze, or would you like more information about any particular aspect of fraud detection?`;
  }

  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: response,
    timestamp: new Date(),
  };
}
