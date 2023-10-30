import { AllHTMLAttributes, useEffect } from "react";
import getCustomer from "../../api/customer";
import useAsync from "../../hooks/useAsync";
import FormMessage from "../shared/FormMessage";

function Avatar(props: AllHTMLAttributes<HTMLDivElement>) {
  const customerAsync = useAsync(getCustomer);

  useEffect(() => {
    customerAsync.execute();
  }, []);

  return (
    <div {...props}>
      {customerAsync.isLoading && (
        <div className="animate-pulse bg-gray-300 rounded-full w-full h-full"></div>
      )}

      {!customerAsync.isLoading && (customerAsync.error || !customerAsync.data) && (
        <FormMessage className="w-full h-full" purpose="error">
          Failed to load avatar.
        </FormMessage>
      )}

      {customerAsync.data && (
        <img
          className="w-full h-full"
          src={customerAsync.data.avatar}
          alt={`${customerAsync.data.first_name}'s avatar`}
        />
      )}
    </div>
  );
}

export default Avatar;
