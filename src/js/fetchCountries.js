export default function fetchCountries(country) {
  return fetch(
    `https://restcountries.com/v2/name/${country}?fields=name,capital,population,flags,languages`,
  )
    .then(r => r.json())
    .then(data => {
      if (data.status === 404) {
        throw new Error(response.status);
      }
      return data;
    })
    .catch(data => data);
}
