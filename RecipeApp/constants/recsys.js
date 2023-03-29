import axios from 'axios';

const API_BASE_URL = 'http://192.168.100.22:5000';

const getRecom = async ingredients => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/recipe?ingredients=${ingredients}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getRecom;
