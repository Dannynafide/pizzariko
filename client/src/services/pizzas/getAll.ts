export const getAll = (): Promise<Response> => {
  return fetch("http://localhost:3001/api/pizza");
};
