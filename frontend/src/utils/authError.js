export function getAuthErrorMessage(error, fallback) {
  return error.response?.data?.message || error.response?.data?.errors?.[0]?.message || (error.code === "ERR_NETWORK" ? "Unable to reach the API. Check that the backend is running and the frontend URL is allowed by CORS." : error.message) || fallback
}
