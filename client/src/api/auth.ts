import useAuth from "../hooks/useAuth";

export interface LoginResponseSuccess {
  success: true;
  token: string;
  customerId: number;
}

export interface LoginResponseFail {
  success: false;
  errorMessage: string;
}

export async function login(email: string, password: string) {
  let data: LoginResponseSuccess | LoginResponseFail;

  try {
    const response = await fetch(`http://localhost:8080/login?email=${email}&password=${password}`);
    data = await response.json();
  } catch (error) {
    data = {
      success: false,
      errorMessage: "Something went wrong.",
    };
  }

  if (data.success) {
    localStorage.setItem(
      "auth",
      JSON.stringify({
        token: data.token,
        customerId: data.customerId,
      })
    );
  }

  return data;
}

export interface LogoutResponseSuccess {
  success: true;
}

export interface LogoutResponseFail {
  success: false;
  errorMessage: string;
}

export async function logout() {
  const auth = useAuth();
  if (!auth) {
    return {
      success: false,
      errorMessage: "You are not logged in.",
    };
  }

  try {
    const res = await fetch(`http://localhost:8080/logout?customerId=${auth.customerId}&token=${auth.token}`);
    const data: LoginResponseSuccess | LoginResponseFail = await res.json();

    console.log(data);
    if (data.success) {
      localStorage.removeItem("auth");
    }

    return data;
  } catch (error) {
    return {
      success: false,
      errorMessage: "Something went wrong.",
    };
  }
}
