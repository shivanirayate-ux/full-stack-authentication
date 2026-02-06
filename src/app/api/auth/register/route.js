import pool from "../lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {
    first_name,
    last_name,
    email,
    mobile,
    password,
  } = await req.json();

  // Validation
  if (!first_name || !last_name || !email || !mobile || !password) {
    return NextResponse.json(
      { message: "All fields required" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      `
      INSERT INTO users 
      (first_name, last_name, email, mobile, password)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [first_name, last_name, email, mobile, hashedPassword]
    );

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }
}
