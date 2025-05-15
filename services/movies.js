import axios from 'axios';

const API_URL = 'http://localhost:8001'; // Change to your backend URL

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

export const getMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addMovie = async (movieData) => {
  try {
    const response = await axios.post(`${API_URL}/movies`, movieData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateMovie = async (id, movieData) => {
  try {
    const response = await axios.put(`${API_URL}/movies/${id}`, movieData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/movies/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};