import axios from 'axios';

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: 'http://localhost:8000', // Adjust this to your backend API URL
});

// Function to fetch medicines
export const fetchMedicines = async () => {
  try {
    const response = await API.get('/medicines'); // Ensure this endpoint is correct
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching medicines:", error);
    return null; // Handle errors and return null or an empty array
  }
};

// No login function needed since we allow any details directly in the component
