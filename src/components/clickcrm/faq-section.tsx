import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Do I need WhatsApp Business API or can I use regular WhatsApp?",
    answer: "You need WhatsApp Business API (via Twilio). It's the only way to send automated messages, use approved templates, and track delivery metrics. Regular WhatsApp doesn't support automation or campaigns."
  },
  {
    question: "What costs do I pay vs. what's included in my plan?",
    answer: "Your plan includes: hosting, maintenance, support, and minor updates. You pay Twilio directly for messaging costs (approx. $0.03–0.05 USD per message in the USA). This gives you full control over your WhatsApp spend."
  },
  {
    question: "How fast is setup? What do I need to provide?",
    answer: "Setup takes 7 business days. We just need: your logo, brand colors, product/service list with prices, and access to your WhatsApp number. We handle everything else."
  },
  {
    question: "Can I use my own domain?",
    answer: "Yes. We connect your existing domain (e.g., quotes.yourbusiness.com) at no extra configuration cost. You only pay for the domain if you don't already have one."
  },
  {
    question: "Can I start simple and add automation later?",
    answer: "Absolutely. Start with Starter and upgrade to Pro or Elite anytime. Your data stays intact and the migration is instant."
  },
  {
    question: "What if I already have a website or CRM?",
    answer: "ClickCRM works alongside your existing tools. We can embed the quote form on your current site, or you can use our landing page as a standalone quote funnel."
  },
  {
    question: "Where is my data stored? Can I export it?",
    answer: "Your data is stored securely in the cloud with enterprise-grade encryption. You can export all your leads, clients, and quotes as CSV anytime—your data is always yours."
  },
  {
    question: "What's included in setup vs. what counts as 'minor changes'?",
    answer: "Setup includes: landing page design, quote builder configuration, CRM setup, WhatsApp API integration, and 1-on-1 onboarding. Minor changes are small tweaks like editing text, updating form fields, or modifying WhatsApp templates—not new features or redesigns."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, no penalty. Your plan renews monthly and you can cancel anytime. We provide a full backup of your data (leads, clients, quotes)."
  },
  {
    question: "How does support work?",
    answer: "We respond via WhatsApp and email during business hours (Monday–Friday, 9 AM–6 PM EST). Response time: under 4 hours on business days. Elite plans get priority support with under 2-hour response."
  }
];

const FaqSection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/13051234567?text=Hi,%20I%20have%20a%20question%20about%20ClickCRM', '_blank');
  };

  return (
    <section className="py-16 px-4 bg-gray-900/50 landscape-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white/70 text-lg">
            Get answers before you get started
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gray-800/50 rounded-xl border border-gray-700 px-6"
              >
                <AccordionTrigger className="text-white hover:text-viralOrange text-left py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-10">
          <p className="text-white/50 text-sm mb-4">
            Still have questions?
          </p>
          <Button 
            onClick={handleWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat with us on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
