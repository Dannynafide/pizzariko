import { useEffect, useState } from "react";

type Status<M> =
  | {
      // pending
      data: undefined;
      isLoading: true;
      isError: false;
    }
  | {
      // fullfiled
      data: M;
      isLoading: false;
      isError: false;
    }
  | {
      // failed
      data: undefined;
      isLoading: false;
      isError: true;
    };

export const useApi = <T,>(callback: () => Promise<Response>) => {
  const [state, setState] = useState<Status<T>>({
    data: undefined,
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await callback();
        if (!response.ok) throw Error;

        const records: T = await response.json();
        if (!records) throw Error;

        setState({ data: records, isLoading: false, isError: false });
      } catch (error) {
        setState({ data: undefined, isLoading: false, isError: true });
      }
    };
    loadData();
  }, []);

  // const { data, isLoading, isError } = state;

  return state;
  // return { data, isLoading, isError } as const;
  // return [data, isLoading, isError, setState] as const;
};
