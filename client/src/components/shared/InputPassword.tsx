import { InputHTMLAttributes, useState } from "react";
import InputText from "./InputText";

export default function InputPassword(props: InputHTMLAttributes<HTMLInputElement>) {
  const [type, setType] = useState("password");
  const propsWithType = { ...props };
  propsWithType.type = type;

  return (
    <div className={`flex flex-col ${props.className}`}>
      <InputText className="w-full" {...propsWithType} />
      <button
        type="button"
        className="mt-1 ml-auto text-sm font-bold text-primary-500 hover:text-accent-500 focus:text-accent-700 transition-colors duration-300"
        onClick={() => setType(type === "password" ? "text" : "password")}
      >
        {type === "password" ? "show password" : "hide password"}
      </button>
    </div>
  );
}
