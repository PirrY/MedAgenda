import { NextRequest, NextResponse } from "next/server";

const ADMIN_PATHS = ["/homeAdmin"];
const DOCTOR_PATHS = ["/homeDoctor"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const isAdmin = req.cookies.get("isAdmin")?.value === "true";
  const isDoctor = req.cookies.get("isDoctor")?.value === "true";

  // Usuarios sin token no pueden acceder a rutas protegidas
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Rutas de admin: permitir si es admin (puede ser también doctor)
  if (ADMIN_PATHS.some((path) => pathname.startsWith(path))) {
    if (!isAdmin) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // Rutas de doctor: permitir si es doctor O admin (admin = doctor con privilegios)
  if (DOCTOR_PATHS.some((path) => pathname.startsWith(path))) {
    if (!isDoctor && !isAdmin) {
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
