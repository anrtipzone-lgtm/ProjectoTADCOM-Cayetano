const BASE_URL = 'https://randomuser.me/api/';

export async function fetchUsers({ nat = '', gender = '', page = 1, results = 10 } = {}) {
  const params = new URLSearchParams({ results, page, seed: 'upch2024' });
  if (nat) params.set('nat', nat);
  if (gender) params.set('gender', gender);

  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

  const data = await response.json();
  return {
    users: data.results.map(normalizeUser),
    info: data.info,
  };
}

function normalizeUser(raw) {
  return {
    id: raw.login.uuid,
    name: `${raw.name.first} ${raw.name.last}`,
    gender: raw.gender.charAt(0).toUpperCase() + raw.gender.slice(1),
    address: `${raw.location.street.name} ${raw.location.street.number}`,
    phone: raw.phone,
    email: raw.email,
    country: raw.location.country,
    nat: raw.nat,
    picture: raw.picture.medium,
  };
}
