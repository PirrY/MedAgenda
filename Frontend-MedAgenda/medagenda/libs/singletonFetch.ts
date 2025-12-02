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

  console.log('🚀 API Request:', {
    url: `${API_URL}${endpoint}`,
    method,
    headers,
    body: body ? JSON.stringify(body, null, 2) : undefined,
  });

  try {
    const response = await fetch(`${API_URL}${endpoint}`, headerOptions);

    console.log('📥 API Response:', {
      url: `${API_URL}${endpoint}`,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.error('❌ API Error Response:', {
        url: `${API_URL}${endpoint}`,
        status: response.status,
        errorText: errText,
      });
      let msg = `HTTP error! status: ${response.status}`;
      try {
        const j = errText ? JSON.parse(errText) : null;
        msg = (j as any)?.message || msg;
      } catch {
        if (errText) msg = errText;
      }
      throw new Error(msg);
    }

    if (response.status === 204) {
      console.log('✅ API Success (No Content):', `${API_URL}${endpoint}`);
      return null;
    }

    const text = await response.text();
    if (!text) {
      console.log('✅ API Success (Empty Response):', `${API_URL}${endpoint}`);
      return null;
    }

    try {
      const parsed = JSON.parse(text);
      console.log('✅ API Success Response:', {
        url: `${API_URL}${endpoint}`,
        data: parsed,
      });
      return parsed;
    } catch {
      console.log('✅ API Success (Text Response):', {
        url: `${API_URL}${endpoint}`,
        data: text,
      });
      return text;
    }
  } catch (error) {
    console.error('💥 API Fetch Error:', {
      url: `${API_URL}${endpoint}`,
      error,
    });
    throw error;
  }
};
