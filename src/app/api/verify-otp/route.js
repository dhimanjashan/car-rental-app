import connectToMongo from '../../middleware/mongoose';
import Otp from '../../../app/models/Otp';

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new Response(JSON.stringify({ error: 'Email and OTP are required.' }), { status: 400 });
    }

    await connectToMongo();

    const record = await Otp.findOne({ email });

    if (!record) {
      return new Response(JSON.stringify({ error: 'OTP not found for this email.' }), { status: 400 });
    }

    if (record.expiresAt < new Date()) {
      await Otp.deleteOne({ email });
      return new Response(JSON.stringify({ error: 'OTP has expired.' }), { status: 400 });
    }

    if (record.otp !== otp) {
      return new Response(JSON.stringify({ error: 'Incorrect OTP.' }), { status: 400 });
    }

    await Otp.deleteOne({ email });

    return new Response(JSON.stringify({ message: 'OTP verified successfully.' }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'OTP verification failed.' }), { status: 500 });
  }
}
