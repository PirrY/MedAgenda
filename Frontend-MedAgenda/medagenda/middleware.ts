import { NextRequest, NextResponse } from "next/server";

const ADMIN_PATHS = ["/homeAdmin"];
const DOCTOR_PATHS = ["/homeDoctor"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const isAdmin = req.cookies.get("isAdmin")?.value === "true";
  const isDoctor = req.cookies.get("isDoctor")?.value === "true";

  if (ADMIN_PATHS.some((path) => pathname.startsWith(path))) {
    if (!token || !isAdmin) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (DOCTOR_PATHS.some((path) => pathname.startsWith(path))) {
    if (!token || !isDoctor) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/homeAdmin/:path*", "/homeDoctor/:path*"],
};
