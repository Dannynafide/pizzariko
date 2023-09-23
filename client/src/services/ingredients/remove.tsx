export const remove = (id: string): Promise<Response> => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`http://localhost:3001/api/ingredient/${id}`, requestOptions);
};
