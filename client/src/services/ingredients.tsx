export const fetchIngredients = (): Promise<Response> => {
  return fetch("http://localhost:3001/api/ingredient");
};

export const fetchIngredient = (id: string): Promise<Response> => {
  return fetch(`http://localhost:3001/api/ingredient/${id}`);
};
