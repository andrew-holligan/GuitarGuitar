import { HtmlHTMLAttributes } from "react";

export interface FormMessageProps extends HtmlHTMLAttributes<HTMLDivElement> {
  purpose: "error" | "success" | "neutral";
}

export default function FormMessage(props: FormMessageProps) {
  const fixedProps = { ...props };
  delete fixedProps.className;

  return (
    <div
      {...fixedProps}
      className={`rounded-lg border-4 p-3 flex items-center
      ${props.purpose === "error" && "bg-red-500 bg-opacity-25 border-red-500 text-red-500"} 
      ${props.purpose === "success" && "bg-emerald-500 bg-opacity-25 border-emerald-500 text-emerald-500"} 
      ${props.purpose === "neutral" && "bg-blue-500 bg-opacity-25 border-blue-500 text-blue-500"} 
      ${props.className}`}
    >
      {props.children}
    </div>
  );
}
