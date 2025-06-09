import { redirectToLogin } from "./redirectToLogin";

export async function fetchWithError(fetchPromise) {
  const response = await fetchPromise;

  if (!response.ok) {
    let error = {
        status: response.status,
        message: '',
    }

    // Navigate to login if the response status is 401 (Unauthorized)
    if (response.status === 401) {
        redirectToLogin();
    }

    // Try to convert the response to JSON for more detailed error information
    let json = await response.json().catch(() => null);

    error.message = json?.error || response.statusText || 'An error occurred';

    throw error;
  }

  return response.json();
}