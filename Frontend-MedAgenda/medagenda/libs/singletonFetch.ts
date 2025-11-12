const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

type methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const apiFetch = async (endpoint: string, method: methods, body?: any) => {
    if (!API_URL) {
        throw new Error('API_URL is not defined. Please set NEXT_PUBLIC_API_URL in your environment variables.');
    }

    const headerOptions: any = {
        method,
        headers: {
            "Content-Type": "application/json",
        }
    }
    
    if(method === 'POST' || method === 'PUT') {
        headerOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, headerOptions);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Fetch Error:', error);
        throw error;
    }
}