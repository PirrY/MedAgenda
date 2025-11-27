import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

type methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const apiFetch = async (endpoint: string, method: methods, body?: any) => {
  if (!API_URL) {
    throw new Error('API_URL is not defined. Please set NEXT_PUBLIC_API_URL in your environment variables.');
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = typeof window !== "undefined" ? Cookies.get("token") : null;
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const headerOptions: RequestInit = {
    method,
    headers,
    body: (method === 'POST' || method === 'PUT') ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, headerOptions);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      let msg = `HTTP error! status: ${response.status}`;
      try {
        const j = errText ? JSON.parse(errText) : null;
        msg = (j as any)?.message || msg;
      } catch {
        if (errText) msg = errText;
      }
      throw new Error(msg);
    }

    if (response.status === 204) return null;

    const text = await response.text(); 
    if (!text) return null;             

    try { return JSON.parse(text); } catch { return text; }
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};
