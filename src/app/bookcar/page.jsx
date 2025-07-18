"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

const Page = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const router = useRouter();
  const [userID, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [car, setCar] = useState({});
  const [showBarcodePopup, setShowBarcodePopup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    slug: slug,
    location: "",
    pickupdate: "",
    dropoffdate: "",
    paymentMethod: "payAfter",
    image: "",
    name: "",
    price: "",
  });

  const [carID, setcarID] = useState(null);

  useEffect(() => {
    if (car?.image) {
      setFormData(prev => ({ ...prev, image: car.image }));
    }
  }, [car]);

  useEffect(() => {
    if (car?.name) {
      setFormData(prev => ({ ...prev, name: car.name }));
    }
  }, [car]);

  useEffect(() => {
    if (car?.price) {
      setFormData(prev => ({ ...prev, price: car.price }));
    }
  }, [car]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/getcar?slug=${slug}`);
        const data = await response.json();
        setCar(data.car || {});
        setcarID(data.car._id);
      } catch (error) { }
    };

    if (slug) fetchCar();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("myToken");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch("/api/getUser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUserId(data.id))
      .catch(() => { });
  }, [token]);

  const handleConfirm = async (e) => {
    e.preventDefault();
    const { username, email, phone, pickupdate, dropoffdate, slug, location, paymentMethod } = formData;

    if (username && email && phone && pickupdate && dropoffdate && slug && location) {
      if (paymentMethod === "payNow") {
        setShowBarcodePopup(true);
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const pickupDate = new Date(pickupdate);
      const dropoffDate = new Date(dropoffdate);

      if (pickupDate < today) {
        toast.error("Pick-up date cannot be in the past.");
        return;
      }

      if (dropoffDate <= pickupDate) {
        toast.error("Drop-off date must be after the pick-up date.");
        return;
      }

      if (paymentMethod === "payAfter") {
        try {
          const response = await fetch("/api/bookCar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          const data = await response.json();

          if (response.ok) {
            toast.success("You've successfully booked your ride!");
            setTimeout(() => {
              router.push(`/myBookings?slug=${slug}&email=${email}`);
            }, 1000);
          } else {
            toast.error(data.error || "Booking failed!");
          }
        } catch (err) {
          toast.error("Something went wrong.");
        }
      }
    } else {
      toast.error("Please fill out all fields.");
    }

    localStorage.setItem("carSlug", slug);

    await fetch("/api/createRental", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userID,
        carId: carID,
        pickupDate: new Date(formData.pickupdate),
        returnDate: new Date(formData.dropoffdate),
        pickupConfirmed: true,
        returnConfirmed: true
      }),
    });
  };

  const handlePaymentComplete = async () => {
    try {
      const response = await fetch("/api/bookCar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Payment successful! You've booked your ride!");
        setShowBarcodePopup(false);
        setTimeout(() => {
          router.push(`/myBookings?slug=${slug}&email=${formData.email}`);
        }, 1000);
      } else {
        toast.error(data.error || "Booking failed!");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 grid-cols-1 ">
      <div className="flex flex-col items-center p-10 bg-yellow-500 shadow-md">
        <div className='mt-20'>
          <h1 className="text-5xl font-bold text-black mb-4 text-center">{car.name}</h1>
          {car.image && (
            <Image
              src={`/${car.image}`}
              alt="Car"
              width={400}
              height={250}
              className="rounded-xl object-cover mb-4"
            />
          )}
        </div>
        <h2 className="text-2xl font-semibold text-black">₹{car.price}/day</h2>
      </div>

      <div className="flex justify-center items-center p-8">
        <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">Book This Car</h2>
          <form className="space-y-5" onSubmit={handleConfirm}>
            <Input label="Full Name" name="username" type="text" value={formData.username} onChange={handleChange} placeholder="John Doe" />
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
            <Input label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" />
            <div>
              <label className="block text-sm font-semibold mb-1 text-white">Location</label>
              <textarea
                name="location"
                rows={3}
                value={formData.location}
                onChange={handleChange}
                placeholder="221B Evergreen Street, Ludhiana"
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600   text-gray-300 resize-none"
              />
            </div>
            <div className="flex gap-4">
              <Input label="Pick-up Date" name="pickupdate" type="date" value={formData.pickupdate} onChange={handleChange} />
              <Input label="Drop-off Date" name="dropoffdate" type="date" value={formData.dropoffdate} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-white">Payment Method</label>
              <div className="space-y-2 text-white hover:cursor-pointer">
                <RadioOption
                  name="paymentMethod"
                  value="payNow"
                  label="Pay Now (Online)"
                  checked={formData.paymentMethod === "payNow"}
                  onChange={handleChange}
                />
                <RadioOption
                  name="paymentMethod"
                  value="payAfter"
                  label="Pay After Ride (Cash or UPI)"
                  checked={formData.paymentMethod === "payAfter"}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-300 transition hover:cursor-pointer"
            >
              {formData.paymentMethod === "payNow" ? "Pay Now" : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>

      {showBarcodePopup && (
        <div className="fixed min-h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-10">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Complete Your Payment</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Booking Details</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Car:</span> {car.name}</p>
                <p><span className="font-medium">Total Amount:</span> ₹{car.price}</p>
                <p><span className="font-medium">Duration:</span> {formData.pickupdate && formData.dropoffdate ? Math.ceil(Math.abs(new Date(formData.dropoffdate) - new Date(formData.pickupdate)) / (1000 * 60 * 60 * 24)) : 0} days</p>
              </div>
            </div>
            <div className="flex justify-center m-h">
              <div className="bg-gray-200 p-6 rounded-lg">
                <div className="w-48 h-48 bg-white border-2 border-gray-300 flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1 p-4">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600 mb-6 text-sm">
              Scan this QR code with your UPI app to complete the payment
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowBarcodePopup(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-400 transition hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentComplete}
                className="flex-1 bg-yellow-400 text-black py-3 rounded-md hover:bg-yellow-300 transition font-semibold hover:cursor-pointer"
              >
                Payment Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ label, name, type, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-semibold mb-1 text-white">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-300"
    />
  </div>
);

const RadioOption = ({ name, value, label, checked, onChange }) => (
  <label className="flex items-center gap-2 hover:cursor-pointer">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="accent-yellow-400 hover:cursor-pointer"
    />
    <span>{label}</span>
  </label>
);

export default Page;
