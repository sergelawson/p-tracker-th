import { useCallback, useState } from "react";
import createRequestHandler from "../helpers/createRequestHandler";

type RequestConfig = {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: any;
  params?: any;
};

type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

const useApiRequest = <T>(): [
  (config: RequestConfig) => Promise<T | null>,
  ApiResponse<T>
] => {
  const axiosInstance = createRequestHandler({
    url: "http://localhost:2002/api",
  });

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const makeRequest = useCallback(async (config: RequestConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.request<T>(config);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      const messageErr = err?.response?.data.mesaage || err?.response?.data;

      setError(messageErr);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return [makeRequest, { data, error, loading }];
};

export default useApiRequest;
