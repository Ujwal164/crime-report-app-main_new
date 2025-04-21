import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("Middleware token:", req.nextauth.token); // Debugging
    console.log("Request path:", req.nextUrl.pathname); // Debugging

    const token = req.nextauth.token;
    const isAdmin = token?.role === "ADMIN";
    const isModerator = token?.role === "MODERATOR";

    // For testing, allow access to dashboard if user is authenticated
    if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
      console.log("No token found, redirecting to signin");
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("Authorized callback token:", token); // Debugging
        return !!token;
      },
    },
  }
);
