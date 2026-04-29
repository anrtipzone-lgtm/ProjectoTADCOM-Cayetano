const BASE_URL = '/api';

export async function fetchCasas() {
  const response = await fetch(`${BASE_URL}/casas`);
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  return response.json();
}

export async function updateCasa(id, data) {
  const response = await fetch(`${BASE_URL}/casas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  // API returns 204 No Content on success
  return data;
}

export async function createCasa(data) {
  const response = await fetch(`${BASE_URL}/casas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  return response.json();
}

export async function deleteCasa(id) {
  const response = await fetch(`${BASE_URL}/casas/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
}
