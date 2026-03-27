export default function hasQuery(query_name = 'query_name', id = 'id') {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  let currentIds = [];
  params.forEach((value, key) => {
    if (key.startsWith(`${query_name}[`)) {
      currentIds.push(value);
    }
  });

  return currentIds.includes(id?.toString());
}
