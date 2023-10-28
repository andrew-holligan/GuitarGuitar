export async function login(email: string, password: string) {
  const response = await fetch(`http://localhost:8080/login?email=${email}&password=${password}`);
  const data = await response.json();

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
