import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Profile from "../components/app/Profile";
import LogoutButton from "../components/app/LogoutButton";

function Home() {
  // redirect to login if not logged in
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  });

  return (
    <>
      <main className="bg-dark-800 w-full h-full p-6 md:p-10 grid grid-rows-[auto_1fr]">
        <header className="flex justify-between gap-8 items-center">
          <Profile className="max-w-md w-full h-24" />

          <LogoutButton className="w-28 h-14" />
        </header>
      </main>
    </>
  );
}

export default Home;
