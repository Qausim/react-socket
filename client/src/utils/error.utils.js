export const resolveApiError = (error) => {
  if (error.response) {
    const status = error.response.request.status;
    const errorData = error.response.data.error;
    if (errorData.message) return `${status}: ${errorData.message}`;
    else {
      const errors = [];
      Object.entries(errorData).forEach(([k, v]) => errors.push(`${k}: ${v}`));
      return errors.join('\n');
    }
  }
  return error.message;
};