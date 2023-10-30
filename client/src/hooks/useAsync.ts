import { useState } from "react";

export default function useAsync<T>(asyncFunction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function execute() {
    try {
      setIsLoading(true);
      const response = await asyncFunction();
      setData(response);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }

  return { execute, data, error, isLoading };
}
