"use client";
import React from 'react';
import Sidebar from "../components/sidebar";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  ChevronRight,
  Star
} from 'lucide-react';

const SupportPage = () => {
  const contactOptions = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "Available 24/7",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      action: "Call Now",
      available: "Mon-Fri 9AM-6PM",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Send us your questions and concerns",
      action: "Send Email",
      available: "Response within 2 hours",
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  const quickHelp = [
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "Booking Issues",
      description: "Problems with making or managing bookings",
      slug: "bookingIssues"
    }
  ];

  const faqs = [
    {
      question: "How do I cancel my booking?",
      answer: "You can cancel your booking up to 24 hours before pickup through your dashboard or by contacting support."
    },
    {
      question: "What documents do I need for rental?",
      answer: "You'll need a valid driver's license, credit card, and government-issued ID for vehicle pickup."
    },
    {
      question: "Can I extend my rental period?",
      answer: "Yes, you can extend your rental if the vehicle is available. Contact us or use the app to request an extension."
    },
    {
      question: "What happens if I return the car late?",
      answer: "Late returns incur additional charges. Please notify us immediately if you'll be returning late."
    }
  ];

  const router = useRouter();

  const handleQuickHelpClick = (item) => {
    router.push(`/${item.slug}`);
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white text-black shadow-lg">
        <Sidebar />
      </aside>

      <main className="flex-1 p-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            How can we <span className="text-yellow-500">help</span> you?
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We're here to support you 24/7. Choose the best way to reach us or find answers to common questions.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6 mx-auto">
                  <div className="text-yellow-600">
                    {option.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
                  {option.title}
                </h3>
                <p className="text-gray-600 mb-4 text-center">
                  {option.description}
                </p>
                <div className="flex items-center justify-center mb-6">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">{option.available}</span>
                </div>
                <Link href="/contact">
                  <button className={`w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors ${option.color} hover:cursor-pointer`}>
                    {option.action}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Help</h2>
          <div className="flex justify-center">
            <div
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow cursor-pointer group max-w-md w-full"
              onClick={() => handleQuickHelpClick(quickHelp[0], 0)}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-lg mb-6 group-hover:bg-yellow-200 transition-colors mx-auto">
                <div className="text-yellow-600 text-xl">
                  {quickHelp[0].icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {quickHelp[0].title}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {quickHelp[0].description}
              </p>
              <div className="flex items-center justify-center text-yellow-600 group-hover:text-yellow-700">
                <span className="text-sm font-medium">Learn more</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-xl shadow-md overflow-hidden group">
                  <summary className="p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-4">
                        {faq.question}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Emergency Support</h2>
            <p className="text-lg mb-6 opacity-90">
              Need immediate assistance? Our emergency support is available 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors hover:cursor-pointer">
                  Emergency Chat
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Rated 4.9/5 by our customers
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied customers who trust our support team
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div>
                <div className="text-2xl font-bold text-gray-900">50k+</div>
                <div>Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div>Support Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">&lt;2min</div>
                <div>Average Response</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SupportPage;
