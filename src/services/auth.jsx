// Function to check if the user is authenticated
export function isAuthenticated() {
    // Check if a valid JWT token exists
    const token = getAuthToken();
    return !!token;
  }
  
  // Function to get the JWT token from storage
  export function getAuthToken() {
    // Get the JWT token from localStorage
    return localStorage.getItem('token');
  }
  
  // Function to set the JWT token in request headers
  export function setAuthHeader(config) {
    // Add the JWT token to the request headers
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  
  // Function to log out the user (remove the JWT token from storage)
  export function logout() {
    // Remove the JWT token from localStorage
    localStorage.removeItem('token');
  }
  