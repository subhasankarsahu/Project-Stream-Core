export function getAuthErrorMessage(error, fallback) {
  return error.response?.data?.message || error.response?.data?.errors?.[0]?.message || fallback
}
