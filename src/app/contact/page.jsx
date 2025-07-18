"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  return (
    <div className=" pb-20 px-6 md:px-20">
      <div className="text-center pt-20 pb-10 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-yellow-300 mb-6">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl">
          Have questions or need assistance? Get in touch with RentRider, and
          our team will get back to you shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold mb-8 text-white">
            Contact Information
          </h2>

          <div className="flex items-center gap-4 mb-6 text-lg">
            <span className="text-orange-400 text-xl">📧</span>
            <p className="text-gray-300">support@rentrider.com</p>
          </div>

          <div className="flex items-center gap-4 mb-6 text-lg">
            <span className="text-orange-400 text-xl">📞</span>
            <p className="text-gray-300">+1 (800) 123–4567</p>
          </div>

          <div className="flex items-center gap-4 text-lg">
            <span className="text-orange-400 text-xl">📍</span>
            <p className="text-gray-300">1234 Elm St, Springfield, IL</p>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold mb-8 text-white">
            Business Hours
          </h2>
          <div className="text-gray-300 text-lg space-y-5">
            <p>🕒 Monday – Friday: 9:00 AM – 8:00 PM</p>
            <p>⏰ Saturday: 10:00 AM – 6:00 PM</p>
            <p>⏱️ Sunday: Closed</p>
          </div>
        </div>

        <form className="bg-gray-800 p-8 rounded-2xl shadow-md space-y-6">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Send a Message
          </h2>

          <div>
            <label className="block text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Your name"
              className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="you@example.com"
              className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Message</label>
            <textarea
              rows={4}
              name="message"
              value={formData.message}
              placeholder="Type your message..."
              className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 font-bold text-black rounded-md bg-yellow-300 hover:bg-yellow-400 hover:cursor-pointer transition-all"
            onClick={handleSubmit}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
