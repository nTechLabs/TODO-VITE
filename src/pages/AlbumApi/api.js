export const ALBUMS_API_URL = "https://jsonplaceholder.typicode.com/albums";

export const fetchAlbums = async () => {
  const res = await fetch(ALBUMS_API_URL);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};
