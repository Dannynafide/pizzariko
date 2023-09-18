export const create = (body: object): Promise<Response> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetch(`http://localhost:3001/api/operation`, requestOptions);
};
