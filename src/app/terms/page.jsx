"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Shield, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: <CheckCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>By accessing and using RentRider's services, you accept and agree to be bound by the terms and provision of this agreement.</p>
          <p>If you do not agree to abide by the above, please do not use this service.</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Important:</strong> These terms constitute a legal agreement between you and RentRider. Please read them carefully before using our services.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "2. Eligibility and Account Registration",
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Eligibility Requirements:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Must be at least 21 years of age</li>
            <li>Must possess a valid driver's license for at least 2 years</li>
            <li>Must have a clean driving record</li>
            <li>Must provide valid credit card information</li>
            <li>Must pass identity verification process</li>
          </ul>

          <h4 className="font-semibold text-gray-900">Account Registration:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must provide accurate, current, and complete information</li>
            <li>You are responsible for maintaining the confidentiality of your account</li>
            <li>You must notify us immediately of any unauthorized use</li>
            <li>RentRider reserves the right to suspend or terminate accounts</li>
          </ul>
        </div>
      )
    },
    {
      title: "3. Vehicle Rental Terms",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Rental Period:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Rental period begins at the time of vehicle pickup</li>
            <li>Late returns may incur additional charges</li>
            <li>Extensions must be approved in advance</li>
            <li>Vehicles must be returned during business hours unless otherwise arranged</li>
          </ul>

          <h4 className="font-semibold text-gray-900">Vehicle Use Restrictions:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Vehicles may only be driven by authorized drivers</li>
            <li>No smoking, pets, or illegal substances allowed</li>
            <li>Off-road driving is strictly prohibited</li>
            <li>Racing, stunts, or reckless driving is forbidden</li>
            <li>Vehicles cannot be used for commercial purposes</li>
          </ul>

          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> Violation of vehicle use restrictions may result in immediate termination of rental agreement and additional penalties.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "4. Pricing and Payment",
      icon: <Clock className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Pricing Structure:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Base rental rates are calculated per hour/day</li>
            <li>Additional fees may apply for extras (GPS, child seats, etc.)</li>
            <li>Fuel charges apply if vehicle is not returned with same fuel level</li>
            <li>Late return fees: $25 per hour after grace period</li>
            <li>Cleaning fees apply for excessive mess or damage</li>
          </ul>

          <h4 className="font-semibold text-gray-900">Payment Terms:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment is due at time of booking confirmation</li>
            <li>Security deposit will be held on your credit card</li>
            <li>Final charges will be processed within 24 hours of return</li>
            <li>Disputed charges must be reported within 7 days</li>
          </ul>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Security Deposit:</strong> A security deposit of $200-$500 (depending on vehicle type) will be authorized on your credit card.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "5. Insurance and Liability",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Insurance Coverage:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Basic liability insurance is included with all rentals</li>
            <li>Collision damage waiver is available for additional fee</li>
            <li>Personal injury protection may be required by law</li>
            <li>Your personal auto insurance may provide additional coverage</li>
          </ul>

          <h4 className="font-semibold text-gray-900">Renter Liability:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are responsible for all traffic violations and fines</li>
            <li>You liable for damage not covered by insurance</li>
            <li>You must report accidents immediately to police and RentRider</li>
            <li>Failure to report incidents may void insurance coverage</li>
          </ul>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Protection:</strong> We recommend purchasing our comprehensive coverage package for maximum protection.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "6. Cancellation and Refund Policy",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Cancellation by Renter:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Free cancellation up to 24 hours before pickup</li>
            <li>50% refund for cancellations 2-24 hours before pickup</li>
            <li>No refund for cancellations within 2 hours of pickup</li>
            <li>No-show bookings are non-refundable</li>
          </ul>

          <h4 className="font-semibold text-gray-900">Cancellation by RentRider:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>We may cancel for vehicle unavailability</li>
            <li>Full refund provided for cancellations on our end</li>
            <li>Alternative vehicle will be offered when possible</li>
            <li>We are not liable for consequential damages</li>
          </ul>

          <h4 className="font-semibold text-gray-900">Refund Processing:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Refunds processed within 5-7 business days</li>
            <li>Refunds issued to original payment method</li>
            <li>Processing fees may apply to refunds</li>
          </ul>
        </div>
      )
    },
    {
      title: "7. Prohibited Activities",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Strictly Prohibited:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Driving under the influence of alcohol or drugs</li>
            <li>Allowing unauthorized persons to drive</li>
            <li>Using vehicle for illegal activities</li>
            <li>Modifying or tampering with the vehicle</li>
            <li>Leaving the vehicle unattended with engine running</li>
            <li>Transporting hazardous materials</li>
            <li>Exceeding vehicle capacity limits</li>
          </ul>

          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <p className="text-sm text-red-800">
              <strong>Legal Consequences:</strong> Violation of these terms may result in immediate termination of rental, legal action, and criminal charges.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "8. Privacy Policy",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Information Collection:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>We collect personal information necessary for rental services</li>
            <li>Driving records and background checks may be performed</li>
            <li>Vehicle usage data is monitored for safety and security</li>
            <li>Payment information is processed securely</li>
          </ul>

          <h4 className="font-semibold text-gray-900">Information Use:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal information is used solely for rental services</li>
            <li>Data may be shared with insurance companies and law enforcement</li>
            <li>Marketing communications require explicit consent</li>
            <li>Information is not sold to third parties</li>
          </ul>

          <h4 className="font-semibold text-gray-900">Data Security:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Industry-standard encryption protects your data</li>
            <li>Regular security audits ensure system integrity</li>
            <li>Access to personal information is strictly limited</li>
            <li>Data breaches are reported immediately</li>
          </ul>
        </div>
      )
    },
    {
      title: "9. Limitation of Liability",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>RentRider's liability is limited to the maximum extent permitted by law.</p>

          <h4 className="font-semibold text-gray-900">Limitations Include:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>No liability for indirect or consequential damages</li>
            <li>Maximum liability limited to rental cost</li>
            <li>No responsibility for personal property left in vehicles</li>
            <li>No liability for delays or cancellations beyond our control</li>
            <li>Force majeure events exclude liability</li>
          </ul>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> Some jurisdictions do not allow limitation of liability for personal injury or property damage. These limitations may not apply to you.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "10. Dispute Resolution",
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Resolution Process:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Initial disputes should be addressed with customer service</li>
            <li>Formal complaints must be submitted in writing</li>
            <li>Mediation may be required before legal action</li>
            <li>Arbitration clause may apply to certain disputes</li>
          </ul>

          <h4 className="font-semibold text-gray-900">Governing Law:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>These terms are governed by local jurisdiction laws</li>
            <li>Any legal action must be filed in appropriate courts</li>
            <li>Statute of limitations applies to all claims</li>
          </ul>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Contact Us:</strong> For disputes or questions about these terms, contact our legal department at legal@rentrider.com
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Terms and Conditions
            </h1>
            <p className="text-lg text-gray-400 mb-6">
              Please read these terms carefully before using RentRider services
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-yellow-800">
                <strong>Last Updated:</strong> January 2025 | <strong>Effective Date:</strong> January 1, 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-yellow-600">
                    {section.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                {activeSection === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {activeSection === index && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4 text-gray-700 leading-relaxed">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Questions About These Terms?
          </h3>
          <p className="text-gray-600 mb-6">
            If you have any questions about these Terms and Conditions, please contact us:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-700">
            <button className="bg-white text-yellow-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors hover:cursor-pointer text-xl">
              <a href='mailto:support@rentrider.com'>Email Support</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
