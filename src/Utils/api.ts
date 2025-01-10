// Verifica si estamos en un entorno de producción
const isProduction = process.env.NODE_ENV === 'production';

const getToken = () => {
  if (typeof window !== "undefined") {
    // Estamos en el navegador, por lo que podemos acceder a localStorage
    return localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1ODc2MTAyLCJpYXQiOjE3MzU4NzU4MDIsImp0aSI6IjdjZmI5YmQ5ODhjNzQyYjNiMTFlOTZjMDJjYzQzYTZjIiwidXNlcl9pZCI6MX0._7kDar-CoJ8RBBiiJHZ1mllWxm_pfuzKUPAc9twL7U8');
  }
  return null; // En el servidor, no intentamos acceder a localStorage
};

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const API_TOKEN =  getToken();

const headers: HeadersInit = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

// Define interfaces for the data
interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  image: string;
  downloads: number;
  descriptions: string[];
  url_download: string;
}

interface APIResponse<T> {
  data: T;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    if (!isProduction) {
      console.log('Attempting to fetch data...');
      console.log('Headers:', headers);
    }
    const response = await fetch(`${API_BASE_URL}/data/`, { headers });

    if (!isProduction) {
      console.log('Fetch response:', response);
    }

    if (!response.ok) {
      const errorText = await response.text();
      if (!isProduction) {
        console.error('Error Response Text:', errorText);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!isProduction) {
      console.log('Fetched data:', data);
    }
    return data;
  } catch (error) {
    if (!isProduction) {
      console.error('Fetch error:', error);
    }
    throw error;
  }
};

export const fetchProductDetail = async (name: string): Promise<Product> => {
  console.log(`Fetching product detail for: ${name}`);
  try {
    const response = await fetch(`${API_BASE_URL}/data/${name}/`, { headers });
    if (!response.ok) {
      console.error('API Error:', await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product detail for "${name}":`, error);
    throw error;
  }
};


export const incrementDownloads = async (name: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/data/${name}/download/`, {
      method: 'POST',
      headers,
    });
    if (!response.ok) {
      if (!isProduction) {
        console.error('Response status:', response.status);
        console.error('Response text:', await response.text());
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (!isProduction) {
      console.log(`Downloads incremented for ${name}`);
    }
  } catch (error) {
    if (!isProduction) {
      console.error('Error incrementing downloads:', error);
    }
    throw error;
  }
};


export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/data/?category=${category}`, { headers });
        if (!response.ok) {
            if (!isProduction) {
                console.error('Response status:', response.status);
                console.error('Response text:', await response.text());
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        if (!isProduction) {
            console.log(`Products fetched for category "${category}":`, data);
        }
        return data;
    } catch (error) {
        if (!isProduction) {
            console.error(`Error fetching products for category "${category}":`, error);
        }
        throw error;
    }
};

export const fetchProductUpdates = async (nameProduct) => {
    try {
        const response = await fetch(`${API_BASE_URL}/data/${nameProduct}/updates/`, { headers });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching product updates:', error);
        throw error;
    }
};

export const fetchProductVersionHistory = async (nameProduct) => {
    try {
        const response = await fetch(`${API_BASE_URL}/data/${nameProduct}/version-history/`, { headers });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching product version history:', error);
        throw error;
    }
};

