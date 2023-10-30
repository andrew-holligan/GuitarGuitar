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

export interface CustomerSuccessResponse {
  success: true;
  customer: Customer;
}

export interface CustomerFailResponse {
  success: false;
  errorMessage: string;
}

let customerCached: Customer | null = null;

export default async function getCustomer(
  forceFetch = false
): Promise<CustomerSuccessResponse | CustomerFailResponse> {
  const auth = useAuth();
  if (!auth) {
    customerCached = null;
    return {
      success: false,
      errorMessage: "Not logged in.",
    };
  }

  if (customerCached && !forceFetch && auth.customerId == customerCached.Id) {
    return { success: true, customer: customerCached };
  }

  try {
    const res = await fetch(
      `http://localhost:8080/customer?customerId=${auth.customerId}&token=${auth.token}`
    );

    const data: CustomerSuccessResponse | CustomerFailResponse = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      errorMessage: "Failed to fetch customer data.",
    };
  }
}
