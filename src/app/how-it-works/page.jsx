import React from 'react';
import { UserPlus, Car, FileText, CheckCircle, Calendar, MapPin, ArrowRight, Clock, Shield, Star } from 'lucide-react';

const HowRentRiderWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Create Account",
      description: "Sign up with your email and verify your identity with required documents",
      icon: <UserPlus className="w-8 h-8" />,
      details: [
        "Provide basic personal information",
        "Add payment method",
      ],
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      step: 2,
      title: "Select Car",
      description: "Browse our fleet and choose the perfect vehicle for your needs",
      icon: <Car className="w-8 h-8" />,
      details: [
        "Filter by location and availability",
        "Compare prices and features",
        "View detailed car specifications",
        "Check real-time availability"
      ],
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      step: 3,
      title: "Fill Booking Form",
      description: "Complete your reservation with pickup and return details",
      icon: <FileText className="w-8 h-8" />,
      details: [
        "Select pickup date and time",
        "Choose return schedule",
        "Review terms and conditions"
      ],
      color: "bg-yellow-500",
      lightColor: "bg-yellow-50",
      textColor: "text-yellow-600"
    },
    {
      step: 4,
      title: "Confirm Booking",
      description: "Review your details and confirm your reservation",
      icon: <CheckCircle className="w-8 h-8" />,
      details: [
        "Review booking summary",
        "Confirm payment details",
        "Receive booking confirmation",
      ],
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      step: 5,
      title: "Car Booked",
      description: "Your reservation is confirmed and ready for pickup",
      icon: <Calendar className="w-8 h-8" />,
      details: [
        "Receive confirmation email",
        "Get booking reference number",
        "Access pickup location details",
        "Set pickup reminders"
      ],
      color: "bg-pink-500",
      lightColor: "bg-pink-50",
      textColor: "text-pink-600"
    },
    {
      step: 6,
      title: "Pick Up Car",
      description: "Visit our office to collect your vehicle and start your journey",
      icon: <MapPin className="w-8 h-8" />,
      details: [
        "Arrive at pickup location",
        "Complete vehicle inspection",
        "Collect keys and documents",
        "Start your rental period"
      ],
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick & Easy",
      description: "Complete booking process in just 5 minutes"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Safe",
      description: "All transactions are encrypted and vehicles are insured"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Well-maintained vehicles with regular safety checks"
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              How RentRider Works
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Getting your perfect rental car is simple and straightforward. Follow these easy steps to book your next vehicle with RentRider.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-24 bg-gray-200 z-0"></div>
              )}
              <div className="flex items-start space-x-8">
                <div className={`relative z-10 ${step.color} rounded-full p-4 text-white flex-shrink-0`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="flex items-center space-x-4 mb-2">
                          <span className={`${step.textColor} text-sm font-semibold uppercase tracking-wide`}>
                            Step {step.step}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-lg">
                          {step.description}
                        </p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden md:block">
                          <ArrowRight className="w-8 h-8 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className={`${step.lightColor} rounded-xl p-6`}>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-3">
                            <div className={`w-2 h-2 ${step.color} rounded-full`}></div>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose RentRider?
            </h2>
            <p className="text-lg text-gray-600">
              Experience the difference with our premium car rental service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-yellow-600 flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-yellow-100 mb-8">
            Join thousands of satisfied customers who trust RentRider for their transportation needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-yellow-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors hover:cursor-pointer">
              <a href='/signup'>Create Account Now</a>
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-yellow-600 transition-colors hover:cursor-pointer">
              <a href='/allCars'>Browse Cars</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowRentRiderWorks;
