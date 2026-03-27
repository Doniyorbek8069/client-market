/** @format */

export const replaceMultiParams = (query, values = []) => {
  let url = new URL(window?.location?.href);
  url?.searchParams?.delete(query);

  // Ensure values is iterable
  if (!values || !values[Symbol.iterator]) {
    throw new Error('values must be an iterable (e.g., array)');
  }

  for (let value of values) {
    url?.searchParams?.append(query, value);
  }

  return url?.search;
};
export default replaceMultiParams;
