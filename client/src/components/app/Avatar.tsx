import { AllHTMLAttributes, useEffect } from "react";
import getCustomer from "../../api/customer";
import useAsync from "../../hooks/useAsync";
import FormMessage from "../shared/FormMessage";

function Avatar(props: AllHTMLAttributes<HTMLDivElement>) {
  const customerAsync = useAsync(getCustomer);

  useEffect(() => {
    customerAsync.execute();
  }, []);

  let content = <></>;

  if (customerAsync.isLoading) {
    content = <div className="animate-pulse bg-accent-900 rounded-lg w-full h-full"></div>;
  } else if (customerAsync.error || !customerAsync.data?.success) {
    content = (
      <FormMessage className="w-full h-full rounded-lg" purpose="error">
        Failed to load avatar.
      </FormMessage>
    );
  } else if (customerAsync.data && customerAsync.data.success) {
    content = (
      <>
        <div className="bg-accent-900 w-full h-full absolute top-0 left-0 rounded-lg"></div>
        <img
          className="w-full h-full absolute top-0 left-0 rounded-lg"
          src={customerAsync.data.customer.avatar}
          alt={`${customerAsync.data.customer.first_name}'s avatar`}
        />
      </>
    );
  }

  return (
    <div {...props} className={`relative ${props.className}`}>
      {content}
    </div>
  );
}

export default Avatar;
