import useAuth from "../hooks/useAuth";

export interface Customer {
  Id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  avatar: string;
  address: Address;
  Orders: any;
  LoyaltyLevel: number;
}

export interface Address {
  city: string;
  street_name: string;
  street_address: string;
  zip_code: string;
  country: string;
}

let customerCached: Customer | null = null;

export default async function getCustomer(forceFetch = false) {
  const auth = useAuth();
  if (!auth) {
    customerCached = null;
    return null;
  }

  if (customerCached && !forceFetch) {
    return customerCached;
  }

  try {
    const res = await fetch(
      `http://localhost:8080/customer?customerId=${auth.customerId}&token=${auth.customerId}`
    );

    const data: Customer = await res.json();
    customerCached = data;

    return data;
  } catch (error) {
    return null;
  }
}
