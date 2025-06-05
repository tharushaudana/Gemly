const API_URL = 'http://localhost:3000';

export function apiUrl (route) {
  return `${API_URL}${route}`;
}