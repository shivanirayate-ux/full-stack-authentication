import pool from "../lib/db";
import * as bcrypt from "bcryptjs";
import { generateToken } from "../lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = generateToken(user);

  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return response;
}
