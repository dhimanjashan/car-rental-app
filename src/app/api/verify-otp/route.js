import connectToMongo from '../../middleware/mongoose';
import Otp from '../../../app/models/Otp';

export async function POST(req) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return new Response(JSON.stringify({ error: 'Missing email or OTP' }), { status: 400 });
    }

    await connectToMongo();

    const record = await Otp.findOne({ email });

    if (!record) {
      return new Response(JSON.stringify({ error: 'No OTP found for this email' }), { status: 400 });
    }

    if (record.expiresAt < new Date()) {
      await Otp.deleteOne({ email });
      return new Response(JSON.stringify({ error: 'OTP expired' }), { status: 400 });
    }

    if (record.otp !== otp) {
      return new Response(JSON.stringify({ error: 'Invalid OTP' }), { status: 400 });
    }

    await Otp.deleteOne({ email }); // delete used OTP
    return new Response(JSON.stringify({ message: 'OTP verified' }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Verification failed' }), { status: 500 });
  }
}
