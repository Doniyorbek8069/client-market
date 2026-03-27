/** @format */

export const replaceParamsMultipleQueries = (keyOrParams, value) => {
  let url = new URL(window?.location?.href);
  if (typeof keyOrParams === 'object') {
    Object.entries(keyOrParams).forEach(([key, val]) => {
      if (val || val === 0) {
        url.searchParams.set(key, val);
      } else {
        url.searchParams.delete(key);
      }
    });
  } else {
    if (value || value === 0) {
      url.searchParams.set(keyOrParams, value);
    } else {
      url.searchParams.delete(keyOrParams);
    }
  }
  return url.search;
};
