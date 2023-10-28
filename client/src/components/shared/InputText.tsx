import { InputHTMLAttributes } from "react";

export default function InputText(props: InputHTMLAttributes<HTMLInputElement>) {
  const fixedProps = { ...props };
  fixedProps.type = props.type || "text";
  delete fixedProps.className;

  return (
    <input
      className={`bg-lightdark-800 rounded-lg outline-none h-16 placeholder:text-light placeholder:opacity-20 py-5 px-4 text-light text-opacity-75 font-medium ${props.className}`}
      {...fixedProps}
    />
  );
}
