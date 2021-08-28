export const BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/";

const pollutionEndPoints = {
  GET_POLLUTION_DATA: "v2/measurements",
  GET_COUNTRY:
    "v2/countries?limit=200&page=1&offset=0&sort=asc&order_by=country",
  GET_CITIES: "v2/cities",
};

export const ApiConstants = {
  BASE_URL: BASE_URL,
  ...pollutionEndPoints,
};

const tokenNotRequired = [ApiConstants.GET_POLLUTION_DATA];

export function shouldTokenRequired(url: string) {
  const results = tokenNotRequired.filter((x) => url.includes(x));
  return results.length === 0;
}
