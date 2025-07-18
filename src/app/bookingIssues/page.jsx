"use client"
import React, { useState } from 'react'
import Sidebar from "../components/sidebar"
import Link from 'next/link'
import {
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Filter
} from 'lucide-react'

const BookingIssuesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedItems, setExpandedItems] = useState({})

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const categories = [
    { id: 'all', name: 'All Issues', icon: <Filter className="w-4 h-4" /> },
    { id: 'booking', name: 'Booking Process', icon: <Calendar className="w-4 h-4" /> },
    { id: 'payment', name: 'Payment Issues', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'cancellation', name: 'Cancellation', icon: <XCircle className="w-4 h-4" /> },
    { id: 'modification', name: 'Modifications', icon: <RefreshCw className="w-4 h-4" /> }
  ]

  const commonIssues = [
    {
      id: 1,
      category: 'booking',
      title: "Can't complete booking process",
      description: "Booking form gets stuck or won't submit",
      priority: 'high',
      solution: "Clear your browser cache and cookies, then try again. If the issue persists, try using a different browser or device.",
      steps: [
        "Clear browser cache and cookies",
        "Disable browser extensions temporarily",
        "Try using incognito/private browsing mode",
        "Check if your payment method is valid",
        "Contact support if issue continues"
      ]
    },
    {
      id: 2,
      category: 'payment',
      title: "Payment failed or declined",
      description: "Credit card or payment method not working",
      priority: 'high',
      solution: "Verify your payment details and ensure sufficient funds. Contact your bank if the issue persists.",
      steps: [
        "Check card details (number, expiry, CVV)",
        "Ensure sufficient balance/credit limit",
        "Try a different payment method",
        "Contact your bank about online transactions",
        "Use a different card if available"
      ]
    },
    {
      id: 3,
      category: 'booking',
      title: "Car not available for selected dates",
      description: "Desired vehicle shows as unavailable",
      priority: 'medium',
      solution: "Try different dates or browse similar vehicles in the same category.",
      steps: [
        "Check alternative dates nearby",
        "Browse similar car categories",
        "Contact support for manual search"
      ]
    },
    {
      id: 4,
      category: 'cancellation',
      title: "Unable to cancel booking",
      description: "Cancellation option not available or not working",
      priority: 'medium',
      solution: "Check cancellation policy and timeline. Contact support if within cancellation window.",
      steps: [
        "Check if you're within the cancellation window",
        "Try canceling from different devices",
        "Contact support immediately if urgent"
      ]
    },
    {
      id: 5,
      category: 'booking',
      title: "Booking confirmation not received",
      description: "No confirmation email or booking reference",
      priority: 'high',
      solution: "Check spam folder and verify email address. Contact support with payment details.",
      steps: [
        "Check spam/junk email folders",
        "Verify email address is correct",
        "Check your account dashboard",
        "Contact support with payment transaction ID"
      ]
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4" />
      case 'medium': return <Clock className="w-4 h-4" />
      case 'low': return <CheckCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const filteredIssues = commonIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Booking Issues</h1>
          <p className="text-gray-400">Find solutions to common booking problems and get help quickly</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Need Immediate Help?</h3>
            <p className="mb-4 opacity-90">Speak with our booking specialists</p>
            <div className="flex gap-3">
              <Link href="/contact">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 hover:cursor-pointer">
                  <Phone className="w-4 h-4" />
                  Call Now
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Check Your Booking</h3>
            <p className="mb-4 opacity-90">View and manage your current bookings</p>
            <Link href="/dashboard">
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 hover:cursor-pointer">
                <Calendar className="w-4 h-4" />
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for booking issues..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedCategory === category.id
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } hover:cursor-pointer`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Common Booking Issues</h2>
          {filteredIssues.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No issues found</h3>
              <p className="text-gray-500">Try adjusting your search or browse different categories</p>
            </div>
          ) : (
            filteredIssues.map(issue => (
              <div key={issue.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpanded(issue.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getPriorityColor(issue.priority)}`}>
                          {getPriorityIcon(issue.priority)}
                          {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600">{issue.description}</p>
                    </div>
                    <div className="ml-4">
                      {expandedItems[issue.id] ?
                        <ChevronUp className="w-5 h-5 text-gray-400" /> :
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      }
                    </div>
                  </div>
                </div>

                {expandedItems[issue.id] && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                      <p className="text-gray-700 mb-4">{issue.solution}</p>
                      <h4 className="font-semibold text-gray-900 mb-2">Step-by-step guide:</h4>
                      <ol className="space-y-2">
                        {issue.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-gray-300 mb-6">
            Can't find what you're looking for? Our support team is ready to help you resolve any booking issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors hover:cursor-pointer">
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BookingIssuesPage
