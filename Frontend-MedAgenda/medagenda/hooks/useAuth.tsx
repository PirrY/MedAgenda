import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface JWTPayload {
  user_id: number;
  email: string;
  first_name: string;
  second_name?: string;
  first_last_name: string;
  second_last_name?: string;
  phone_number?: string;
  isDoctor?: boolean;
  isAdmin?: boolean;
  iat?: number;
  exp?: number;
}

export default function useAuth() {
  const [user, setUser] = useState<JWTPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const decoded = jwtDecode<JWTPayload>(token);
        setUser(decoded);

        // Leer los roles de las cookies (guardadas en el login)
        const isDoctorCookie = Cookies.get("isDoctor") === "true";
        const isAdminCookie = Cookies.get("isAdmin") === "true";

        setIsDoctor(isDoctorCookie);
        setIsAdmin(isAdminCookie);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFullName = () => {
    if (!user) return "";
    const parts = [
      user.first_name,
      user.second_name,
      user.first_last_name,
      user.second_last_name,
    ].filter(Boolean);
    return parts.join(" ");
  };

  const getFirstName = () => {
    return user?.first_name || "";
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    getFullName,
    getFirstName,
    isDoctor,
    isAdmin,
  };
}
