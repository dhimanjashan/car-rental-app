import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../../app/models/User';
import connectToMongo from '../../../app/middleware/mongoose';

export async function POST(req) {
  await connectToMongo();

  const body = await req.json();
  const { username, email, password } = body;

  if (!username || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  await newUser.save();

  return NextResponse.json({ message: 'User registered successfully.' }, { status: 200 });
}
