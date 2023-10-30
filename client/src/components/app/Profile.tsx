import { AllHTMLAttributes, useEffect } from "react";
import getCustomer from "../../api/customer";
import useAsync from "../../hooks/useAsync";
import FormMessage from "../shared/FormMessage";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import Avatar from "./Avatar";

function Profile(props: AllHTMLAttributes<HTMLDivElement>) {
  const customerAsync = useAsync(getCustomer);

  useEffect(() => {
    customerAsync.execute();
  }, []);

  let content = <></>;

  if (customerAsync.isLoading) {
    content = (
      <>
        <LoadingSpinner className="mx-auto h-full" />
      </>
    );
  } else if (customerAsync.error || !customerAsync.data?.success) {
    content = (
      <>
        <FormMessage className="w-full h-full" purpose="error">
          Failed to load profile.
        </FormMessage>
      </>
    );
  } else if (customerAsync.data && customerAsync.data.success) {
    content = (
      <>
        {/* left */}
        <div className="flex gap-4 items-center">
          <Avatar className="w-20 h-20" />

          {/* info */}
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-3xl text-primary-500">{`${customerAsync.data.customer.first_name} ${customerAsync.data.customer.last_name}`}</h1>
            <h2 className="font-medium text-sm text-accent-500">{`${customerAsync.data.customer.email}`}</h2>
          </div>
        </div>

        {/* right */}
        <div className="flex justify-center items-center">
          <button className="mr-4 text-accent-500 hover:text-accent-700 focus:text-accent-700 transition-colors duration-300">
            {/* TODO replace with icon */}S
          </button>
        </div>
      </>
    );
  }

  return (
    <section
      {...props}
      className={`flex justify-between p-4 items-center bg-lightdark-800 rounded-xl ${props.className}`}
    >
      {content}
    </section>
  );
}

export default Profile;
