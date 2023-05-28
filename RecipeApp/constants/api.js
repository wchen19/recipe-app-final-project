import axios from 'axios';

const API_BASE_URL = 'http://192.168.100.22:3000';

const api = {
  getRecipe: userId =>
    axios.get(`${API_BASE_URL}/${userId}/recipe`, {withCredentials: true}),
  getRandomRecipe: userId =>
    axios.get(`${API_BASE_URL}/${userId}/random/recipe`, {
      withCredentials: true,
    }),
  getBookmarkedRecipes: () => axios.get(`${API_BASE_URL}/bookmarked/recipe`),
  getLeastViewedRecipes: userId =>
    axios.get(`${API_BASE_URL}/${userId}/least-viewed/recipe`),
  getMostViewedRecipes: userId =>
    axios.get(`${API_BASE_URL}/${userId}/most-viewed/recipe`),
  getRecipesByIds: (ids, userId) =>
    axios.get(`${API_BASE_URL}/${userId}/recipes?ids=${ids}`),
  getRecipeById: (id, userId) =>
    axios.get(`${API_BASE_URL}/${userId}/recipe/${id}`),
  addRecipe: recipe => axios.post(`${API_BASE_URL}/recipe`, recipe),
  editRecipe: (id, recipe) => axios.put(`${API_BASE_URL}/recipe/${id}`, recipe),
  deleteRecipe: id => axios.delete(`${API_BASE_URL}/recipe/${id}`),
  toggleBookmark: id => axios.put(`${API_BASE_URL}/recipe/${id}/bookmark`),
  addViewers: id => axios.put(`${API_BASE_URL}/recipe/${id}/viewer`),
  getUserData: userId => axios.get(`${API_BASE_URL}/users/${userId}`),
  getUserBookmarkedRecipes: userId =>
    axios.get(`${API_BASE_URL}/users/${userId}/bookmarked`),
  getSearchHistory: userId =>
    axios.get(`${API_BASE_URL}/users/${userId}/search-history`),
  updateBookmarkedRecipes: (userId, recipeId, action) =>
    axios.put(
      `${API_BASE_URL}/users/${userId}/bookmarked/${recipeId}?action=${action}`,
    ),
  updateSearchHistory: (userId, text) =>
    axios.put(
      `${API_BASE_URL}/users/${userId}/search-history`,
      {text: [text]},
      {withCredentials: true},
    ),
  signup: body =>
    axios.post(`${API_BASE_URL}/signup`, body, {withCredentials: true}),
  login: body =>
    axios.post(`${API_BASE_URL}/login`, body, {withCredentials: true}),
};

export default api;
