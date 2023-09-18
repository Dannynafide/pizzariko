export const fetchPizzas = (): Promise<Response> => {
  return fetch("http://localhost:3001/api/pizza");
};

export const fetchPizza = (id: string): Promise<Response> => {
  return fetch(`http://localhost:3001/api/pizza/${id}`);
};
