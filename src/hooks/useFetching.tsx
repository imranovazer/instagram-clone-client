import { useState } from "react";
import useLoading from "./useLoading";

type CallbackFunction = () => Promise<any>;

const useFetching = (callback: CallbackFunction) => {
  const [error, setError] = useState<Error | null>(null);
  const [applyLoading, loading] = useLoading({
    callback,
    onError: (error: Error) => {
      setError(error);
    },
  });

  return [applyLoading, loading, error] as const;
};

export default useFetching;
