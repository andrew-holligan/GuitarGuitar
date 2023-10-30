import { ButtonHTMLAttributes } from "react";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";

function LogoutButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const navigate = useNavigate();

  const clickHandler = async () => {
    const res = await logout();
    if (res.success) {
      navigate("/login");
    }
  };

  return (
    <Button onClick={clickHandler} purpose="neutral" {...props}>
      logout
    </Button>
  );
}

export default LogoutButton;
