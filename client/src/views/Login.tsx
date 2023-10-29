import { useState, FormEventHandler } from "react";
import Logo from "../components/app/Logo";
import Button from "../components/shared/Button";
import InputPassword from "../components/shared/InputPassword";
import InputText from "../components/shared/InputText";
import Label from "../components/shared/Label";
import useInput from "../hooks/useInput";
import { login } from "../api/auth";
import FormMessage from "../components/shared/FormMessage";

function Login() {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("");

  const [formMessage, setFormMessage] = useState<{
    message: string;
    purpose: "success" | "error" | "neutral";
  }>();

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await login(email, password);
    if (!res.success) {
      setFormMessage({ message: res.errorMessage, purpose: "error" });
    } else {
      setFormMessage({ message: "Successfully logged in.", purpose: "success" });
    }
  };

  return (
    <main className="bg-dark-800 w-full h-full flex flex-col justify-center items-center">
      <Logo className="text-5xl" />

      <form className="flex flex-col justify-center items-center max-w-md w-full mt-12" onSubmit={submit}>
        <div className="w-full">
          <Label className="text-accent-500" htmlFor="email">
            email
          </Label>
          <InputText
            {...bindEmail}
            className="w-full mt-1"
            name="email"
            required
            type="email"
            placeholder="jsmith@gmail.com"
          />
        </div>

        <div className="w-full mt-5">
          <Label className="text-accent-500" htmlFor="password">
            password
          </Label>
          <InputPassword
            {...bindPassword}
            className="w-full mt-1"
            name="password"
            placeholder="mypassword123"
            required
          />
        </div>

        {!!formMessage && (
          <FormMessage className="w-full h-20 mt-6" purpose={formMessage.purpose}>
            {formMessage.message}
          </FormMessage>
        )}

        <Button className="h-[4.5rem] w-full mt-10" type="submit">
          login
        </Button>
      </form>
    </main>
  );
}

export default Login;
