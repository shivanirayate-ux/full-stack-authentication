import pool from "../lib/db";
import { verifyToken } from "../lib/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const result = await pool.query(
      `
      SELECT 
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        mobile,
        email
      FROM users
      WHERE id = $1
      `,
      [decoded.id]
    );

    if (!result.rows.length) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
