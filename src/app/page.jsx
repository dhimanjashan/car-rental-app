
import Image from 'next/image';
// import dynamic from 'next/dynamic';

// const motion = dynamic(() => import('framer-motion').then((mod) => mod.motion), {
//   ssr: false,
// });
import MobileVideo from './components/MobileVideo'; 
import { FaCar, FaPhoneAlt, FaKey, FaLock } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';
import { TbHours24 } from 'react-icons/tb';
import { BsCheckCircle } from 'react-icons/bs';
import Link from 'next/link';
export const dynamic = 'force-dynamic';
import FinalCTA from './components/FinalCTA';
import HeroHeading from './components/HeroHeading'; // top of file

async function getCars() {
  // const fetchCars = async () => {
    const response = await fetch("http://localhost:3000/api/cars", {
      cache: 'no-store', // disables caching
    });;
    const data = await response.json();
    console.log(data)
    return data.cars || [];
  // };
  // fetchCars();
};


export default async function HomePage() {
  const availableCars = await getCars();

  // useEffect(() => {
  //   window.scrollTo(0,1);
  // }, [])
  

 
  const steps = [
    { title: 'Book Your Ride', desc: 'Select your car, time, and location in just a few clicks.', icon: <FaCar size={40} className="text-yellow-400" /> },
    { title: 'Get a Call', desc: 'Our agent will confirm your booking and assist you.', icon: <FaPhoneAlt size={40} className="text-yellow-400" /> },
    { title: 'Pick Up or Delivery', desc: 'Collect your car or have it delivered.', icon: <FaKey size={40} className="text-yellow-400" /> },
    { title: 'Enjoy Your Drive', desc: 'Drive confidently with our insured cars.', icon: <BsCheckCircle size={40} className="text-yellow-400" /> }
  ];

  const benefits = [
    { icon: <IoMdCheckmark size={60} />, title: 'No Hidden Charges' },
    { icon: <FaCar size={60} />, title: 'Wide Range of Vehicles' },
    { icon: <TbHours24 size={60} />, title: '24/7 Support' },
    { icon: <FaLock size={60} />, title: 'Safe & Insured Rides' }
  ];

  // useEffect(() => {
  //   // Detect screen width
  //   const isMobileDevice = window.innerWidth < 768;
  //   setIsMobile(isMobileDevice);
  // }, []);
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden">
      <MobileVideo />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 -mt-20 md:-mt-15 flex flex-col items-center justify-center text-center text-white h-full px-4 space-y-6">
        <HeroHeading />
          <p className="text-lg md:text-2xl font-light -mt-4">Flexible pricing, top-rated cars, instant booking.</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/allCars">
              <button className="rounded bg-white px-8 py-3 text-black font-semibold hover:bg-gray-200 hover:cursor-pointer">Browse Cars</button>
            </Link>
            <Link href="/signup">
              <button className="rounded bg-yellow-300 px-8 py-3 text-black font-semibold hover:bg-yellow-400 hover:cursor-pointer">Get Started</button>
            </Link>
          </div>
        </div>
      </section>

      {/* KEY BENEFITS */}
      <section className=" py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Key Benefits</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {benefits.map((item, i) => (
            <div key={i} className="bg-white text-black p-8 rounded-2xl shadow hover:shadow-lg text-center">
              <div className="mb-4 text-yellow-400 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

       {/* AVAILABLE CARS */}
      <section className="py-20">
        <h2 className="text-4xl font-bold text-center mb-10 px-4 md:px-0">Select Your Desired Car</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10 text-black hover:cursor-pointer">
          {availableCars.slice(0, 4).map((car, i) => (
             <Link href={{ pathname: "/car", query: { slug: car.slug } }} key={i}>
            <motion.div  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
              <Image
                src={`/${car.image}`}
                alt={car.name}
                width={400}
                height={250}
                loading="lazy"
                className="w-full h-56 object-cover rounded-t-2xl"
              />
             
                <div className="p-5 hover:cursor-pointer">
                <h3 className="text-2xl font-bold mb-1">{car.name}</h3>
                <p className="text-gray-600 mb-2">{car.vehicle} • {car.transmission} • {car.fuelType}</p>
                <div className="flex justify-between text-sm text-gray-800">
                  <span>₹{car.price}/day</span>
                  <span className="text-green-600 font-semibold">Available</span>
                </div>
                  <button className="mt-4 w-full bg-yellow-300 text-black py-2 rounded-lg hover:bg-yellow-400 hover:cursor-pointer">Rent This Car</button>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* EXPLORE VEHICLES */}
      <section className="bg-gray-300 text-black flex flex-col md:flex-row items-center gap-10 p-10">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">Explore Our Vehicles</h2>
          <p className="text-lg">Choose from compact cars, SUVs, or luxury sedans. We have the perfect ride for you.</p>
        </div>
        <img src="/carimage8.png" className="w-[500px] h-auto" alt="Explore Cars"  />
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-black text-white flex flex-col md:flex-row items-center gap-10 p-10">
        <img src="/womanImage.png" className="md:w-[500px] md:h-120 h-60" alt="Why Choose Us"  />
        <div className="flex-1">
          <h2 className="md-text-5xl text-3xl font-bold mb-4 ">Why Choose Us?</h2>
          <p className="text-lg">Easy booking, wide vehicle selection, and 24/7 customer support make your journey smooth.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gradient-to-r from-gray-700 to-red-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center border-2 p-6 rounded-xl">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-gray-900 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-8">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          <div><h3 className="text-5xl font-bold text-yellow-400">500+</h3><p>Cars Rented</p></div>
          <div><h3 className="text-5xl font-bold text-yellow-400">300+</h3><p>Happy Clients</p></div>
          <div><h3 className="text-5xl font-bold text-yellow-400">50+</h3><p>Car Models</p></div>
          <div><h3 className="text-5xl font-bold text-yellow-400">24/7</h3><p>Customer Support</p></div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-white py-20 text-black">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            { name: "Aman", quote: "Smooth booking and clean car. Totally satisfied!" },
            { name: "Simran", quote: "Affordable and flexible. Perfect for weekend getaways." },
            { name: "Ravi", quote: "Easy to use and great service support!" },
          ].map((t, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md">
              <p className="italic">“{t.quote}”</p>
              <h4 className="font-semibold mt-4 text-right">— {t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA />
    </>
  );
};

