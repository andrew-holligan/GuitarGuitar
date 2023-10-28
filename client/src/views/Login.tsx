import Logo from "../components/app/Logo";
import Button from "../components/shared/Button";
import InputPassword from "../components/shared/InputPassword";
import InputText from "../components/shared/InputText";
import Label from "../components/shared/Label";

function Login() {
  return (
    <main className="bg-dark-800 w-full h-full flex flex-col justify-center items-center">
      <Logo className="text-5xl" />

      <form className="flex flex-col justify-center items-center max-w-md w-full mt-12" action="">
        <div className="w-full">
          <Label className="text-accent-500" htmlFor="email">
            email
          </Label>
          <InputText className="w-full mt-1" name="email" placeholder="jsmith@gmail.com" />
        </div>

        <div className="w-full mt-5">
          <Label className="text-accent-500" htmlFor="password">
            password
          </Label>
          <InputPassword className="w-full mt-1" name="password" placeholder="mypassword123" />
        </div>

        <Button className="h-[4.5rem] w-full mt-10" type="submit">
          login
        </Button>
      </form>
    </main>
  );
}

export default Login;
