import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  // Redirect root path to register page
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/register", req.url));
  }

  const token = req.cookies.get("token")?.value;
  const protectedRoutes = ["/dashboard", "/profile"];

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
