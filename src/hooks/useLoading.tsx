import { useState } from "react";

const useLoading = (
  {
    callback,
    onError,
  }: { callback: (data: any) => Promise<void>; onError: (error: any) => void },
  defaultLoading = false
): [(data: any | undefined) => void, boolean] => {
  const [loading, setLoading] = useState<boolean>(defaultLoading);

  const applyLoading = async (data: any) => {
    try {
      setLoading(true);
      await callback(data);
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return [applyLoading, loading];
};

export default useLoading;
