export const get = (id: string): Promise<Response> => {
  return fetch(`http://localhost:3001/api/pizza/${id}`);
};
