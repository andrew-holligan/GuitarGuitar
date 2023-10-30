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

  return (
    <section
      {...props}
      className={`flex justify-between p-4 items-center bg-lightdark-800 rounded-xl ${props.className}`}
    >
      {customerAsync.isLoading && (
        <>
          <LoadingSpinner className="mx-auto h-full" />
        </>
      )}

      {!customerAsync.isLoading && (customerAsync.error || !customerAsync.data) && (
        <>
          <FormMessage className="w-full h-full" purpose="error">
            Failed to load profile.
          </FormMessage>
        </>
      )}

      {customerAsync.data && (
        <>
          {/* left */}
          <div className="flex gap-4 items-center">
            <Avatar className="w-16 h-16" />

            {/* info */}
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-2xl text-primary-500">{`${customerAsync.data.first_name} ${customerAsync.data.last_name}`}</h1>
              <h2 className="font-semibold text-xs text-accent-500">{`${customerAsync.data.email}`}</h2>
            </div>
          </div>

          {/* right */}
          <div className="flex justify-center items-center">
            <button className="text-accent-500 hover:text-accent-700 focus:text-accent-700 transition-colors duration-300">
              {/* TODO replace with icon */}S
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Profile;
