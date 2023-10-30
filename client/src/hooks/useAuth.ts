export interface Auth {
  token: string;
  customerId: number;
}

export default function useAuth(): Auth | null {
  const data = localStorage.getItem("auth");
  if (!data) {
    return null;
  }

  try {
    const parsed = JSON.parse(data);
    if (!parsed.token || !parsed.customerId) {
      return null;
    }

    return parsed;
  } catch (error) {
    return null;
  }
}
