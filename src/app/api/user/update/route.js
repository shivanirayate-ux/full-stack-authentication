import pool from "../../auth/lib/db";
import { verifyToken } from "../../auth/lib/jwt";
import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";

export async function PUT(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {

    const decoded = verifyToken(token);
    const { name, firstName, lastName, email, password } = await req.json();

    // Normalize names: prefer explicit firstName/lastName, else split `name` if provided
    let fn = firstName;
    let ln = lastName;
    if ((!fn || !ln) && name) {
      const parts = name.trim().split(/\s+/);
      fn = fn || parts[0] || "";
      ln = ln || parts.slice(1).join(" ") || "";
    }

    // Validation
    if (!fn || !email) {
      return NextResponse.json({ message: "First name and email are required" }, { status: 400 });
    }

    if (fn.trim().length < 2) {
      return NextResponse.json({ message: "First name must be at least 2 characters" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    // Check if email is already taken by another user
    const emailCheck = await pool.query(
      "SELECT id FROM users WHERE email=$1 AND id!=$2",
      [email, decoded.id]
    );
    if (emailCheck.rows.length > 0) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }

    // Build update query to set first_name, last_name, email, and optional password
    let updateQuery = "UPDATE users SET first_name=$1, last_name=$2, email=$3";
    const params = [fn, ln || "", email];

    if (password) {
      if (password.length < 6) {
        return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      updateQuery += ", password=$4";
      params.push(hashedPassword);
    }

    // Add id param
    params.push(decoded.id);
    updateQuery += ` WHERE id=$${params.length}`;

    await pool.query(updateQuery, params);

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
  }
}
