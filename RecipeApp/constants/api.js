import axios from 'axios';

const API_BASE_URL = 'http://192.168.100.22:3000';

const api = {
  getRecipe: () => axios.get(`${API_BASE_URL}/recipe`, {withCredentials: true}),
  getBookmarkedRecipes: () => axios.get(`${API_BASE_URL}/bookmarked/recipe`),
  getLeastViewedRecipes: () => axios.get(`${API_BASE_URL}/least-viewed/recipe`),
  getMostViewedRecipes: () => axios.get(`${API_BASE_URL}/most-viewed/recipe`),
  getRecipesSortedByNameAsc: () =>
    axios.get(`${API_BASE_URL}/sorted-by-name-asc/recipe`),
  getRecipesSortedByNameDesc: () =>
    axios.get(`${API_BASE_URL}/sorted-by-name-desc/recipe`),
  getRecipesByIds: () => axios.get(`${API_BASE_URL}/recipes`),
  getRecipeById: id => axios.get(`${API_BASE_URL}/recipe/${id}`),
  addRecipe: recipe => axios.post(`${API_BASE_URL}/recipe`, recipe),
  editRecipe: (id, recipe) => axios.put(`${API_BASE_URL}/recipe/${id}`, recipe),
  deleteRecipe: id => axios.delete(`${API_BASE_URL}/recipe/${id}`),
  toggleBookmark: id => axios.put(`${API_BASE_URL}/recipe/${id}/bookmark`),
  addViewers: id => axios.put(`${API_BASE_URL}/recipe/${id}/viewer`),
};

export default api;
