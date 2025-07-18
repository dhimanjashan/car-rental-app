import bcrypt from 'bcryptjs';
import connectToMongo from '../../middleware/mongoose';
import User from "../../../app/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, newPassword } = body;

    if (!email || !newPassword) {
      return Response.json({ error: 'Email and new password are required.' }, { status: 400 });
    }

    await connectToMongo();

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ error: 'User not found.' }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return Response.json({ message: 'Password changed successfully.' }, { status: 200 });

  } catch (error) {
    return Response.json({ error: 'Failed to update password.' }, { status: 500 });
  }
}
