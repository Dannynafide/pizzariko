import { useEffect, useState } from "react";

export const useApiAdmin = <T,>(
  callback: () => Promise<Response>,
  loadOnStart: boolean = true
): [T | undefined, boolean, boolean, () => void, (item: object) => void] => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (loadOnStart) sendRequest();
    else setIsLoading(false);
  }, []);

  const request = () => {
    sendRequest();
  };

  const updateData = (response: any) => {
    setData((oldData) => {
      if (oldData instanceof Array) {
        return oldData.map((i) => {
          if (i.id === response.id) {
            return response;
          }
          return i;
        }) as T;
      }
      return undefined;
    });
  };

  const sendRequest = async () => {
    setIsLoading(true);
    try {
      const response = await callback();

      if (!response.ok) throw Error;

      const records: T = await response.json();
      if (!records) throw Error;

      setData(records);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return [data, isLoading, isError, request, updateData];
};
