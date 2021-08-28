export function jsonToQueryString(json: any) {
  const keys = Object.keys(json);
  if (keys.length === 0) {
    return "";
  }
  return (
    "?" +
    keys
      .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
      })
      .join("&")
  );
}
