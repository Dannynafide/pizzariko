export const update = (id: string, body: object): Promise<Response> => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetch(`http://localhost:3001/api/ingredient/${id}`, requestOptions);
};
