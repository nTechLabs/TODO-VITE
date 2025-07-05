export const TODOS_API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = async () => {
  const res = await fetch(TODOS_API_URL);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};
