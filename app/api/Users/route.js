// This file creates new users
import { NextResponse } from "next/server";
import User from "@/app/(models)/User"
import bcrypt from "bycrypt";

export async function POST(req) {
  try {
    const body = await req.json()
    const userData = body.formData

    // Confirm data exists
    if(!userData?.name || !userData.password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    // check for duplicate usernames
    const duplicate = await User.findOne({ email: userData.emial })
      .lean()
      .exec();
    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email"}, { status: 409 })
    };

    // encrypts user password before saving into db
    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await User.create(userData);
    
    return NextResponse.json({ message: "User Created."}, { status: 201 });
  } catch (error) {
    console.log(err)
    return NextResponse.json({message: "Error", err}, {status: 500})
  }
}