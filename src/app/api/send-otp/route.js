import nodemailer from 'nodemailer';
import User from '../../../app/models/User'; // ✅ Import your User model
import Otp from '../../../app/models/Otp';
import connectToMongo from '../../middleware/mongoose';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    await connectToMongo(); // ✅ Connect to DB

    // ✅ Check if user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // ✅ Delete any existing OTPs for this email
    await Otp.deleteMany({ email });

    // ✅ Save new OTP
    await Otp.create({ email, otp, expiresAt });

    // ✅ Send OTP via nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}`,
    });

    return new Response(JSON.stringify({ message: 'OTP sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Send OTP error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send OTP' }), { status: 500 });
  }
}
