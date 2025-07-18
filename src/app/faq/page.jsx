"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail, HelpCircle } from 'lucide-react';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account?",
          answer: "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill in your personal details including your name, email address, and create a secure password. You'll receive a verification email to confirm your account."
        },
        {
          question: "What documents do I need to provide?",
          answer: "You'll need to provide a valid driver's license, proof of insurance, and a credit card for security purposes. All documents must be current and match the name on your account."
        },
        {
          question: "How long does the verification process take?",
          answer: "Account verification typically takes 24-48 hours. During peak times, it may take up to 72 hours. You'll receive an email notification once your account is verified and ready to use."
        }
      ]
    },
    {
      category: "Booking & Reservations",
      questions: [
        {
          question: "How do I book a car?",
          answer: "Browse available cars in your area, select your preferred vehicle, choose your pickup and drop-off times, and complete the booking process. You can book instantly or schedule for later."
        },
        {
          question: "Can I modify or cancel my booking?",
          answer: "Yes, you can modify or cancel your booking up to 2 hours before the scheduled pickup time without any penalties. Cancellations made within 2 hours may incur a small fee."
        },
        {
          question: "What happens if I'm late for pickup?",
          answer: "We offer a 15-minute grace period for pickups. After that, late fees may apply. If you're running significantly late, please contact customer support to avoid automatic cancellation."
        }
      ]
    },
    {
      category: "Payments & Pricing",
      questions: [
        {
          question: "How is pricing calculated?",
          answer: "Pricing is based on the vehicle type, rental duration, distance traveled, and current demand. You'll see the total estimated cost before confirming your booking, including any additional fees."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and digital wallets like Apple Pay and Google Pay. Cash payments are not accepted."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No, we believe in transparent pricing. All fees including insurance, taxes, and service charges are clearly displayed before you complete your booking. The only additional charges would be for damages or violations."
        }
      ]
    },
    {
      category: "Vehicle & Safety",
      questions: [
        {
          question: "Are all vehicles insured?",
          answer: "Yes, all vehicles in our fleet are fully insured with comprehensive coverage. This includes liability, collision, and comprehensive insurance to protect both you and the vehicle."
        },
        {
          question: "What should I do in case of an accident?",
          answer: "First, ensure everyone's safety and call emergency services if needed. Then, contact our 24/7 support hotline immediately. Document the incident with photos and exchange information with other parties involved."
        },
        {
          question: "How often are vehicles maintained?",
          answer: "All vehicles undergo regular maintenance checks every 5,000 miles or 6 months, whichever comes first. We also perform safety inspections before each rental to ensure optimal performance and safety."
        }
      ]
    },
    {
      category: "Account & Support",
      questions: [
        {
          question: "How can I contact customer support?",
          answer: "You can reach our customer support team 24/7 through  email at support@rentrider.com. We also have a comprehensive help center with self-service options."
        },
        {
          question: "How do I delete my account?",
          answer: "You can delete your account by going to Account Settings > Privacy > Delete Account. Please note that this action is permanent and cannot be undone. Make sure to complete any pending bookings first."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className=" shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
             
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Find answers to common questions about our car rental service
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search terms or browse our categories below.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    {category.category}
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {category.questions.map((faq, questionIndex) => {
                    const isActive = activeIndex === `${categoryIndex}-${questionIndex}`;
                    return (
                      <div key={questionIndex} className="p-6">
                        <button
                          onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                          className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-4 rounded-lg transition-colors"
                        >
                          <h3 className="text-lg font-medium text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          {isActive ? (
                            <ChevronUp className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isActive && (
                          <div className="mt-4 px-4">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Support Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still need help?
            </h2>
            <p className="text-lg text-gray-600">
              Our support team is here to help you 24/7
            </p>
          </div>
         
            
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <Mail className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message</p>
              <button className="text-yellow-600 hover:text-yellow-700 font-medium hover:cursor-pointer">
              <a href="mailto:support@rentrider.com">Email Support</a>
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default FAQPage;