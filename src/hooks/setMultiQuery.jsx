export default function setMultiQuery(query_name = 'query_name', id) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  let currentIds = [];
  params.forEach((value, key) => {
    if (key.startsWith(`${query_name}[`)) {
      currentIds.push(value);
    }
  });

  if (currentIds.includes(id.toString())) {
    currentIds = currentIds.filter((itemId) => itemId !== id.toString());
  } else {
    currentIds.push(id);
  }

  Array.from(params.keys()).forEach((key) => {
    if (key.startsWith(`${query_name}[`)) params.delete(key);
  });

  currentIds.forEach((itemId, index) => {
    params.append(`${query_name}[${index}]`, itemId);
  });

  return `?${params.toString()}`;
}
