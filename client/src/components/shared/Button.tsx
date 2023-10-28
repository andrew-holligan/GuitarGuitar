import { ButtonHTMLAttributes, useEffect, useState } from "react";

export default function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & { purpose?: "neutral" | "success" | "danger" }
) {
  const fixedProps = { ...props };
  if (!fixedProps.purpose) fixedProps.purpose = "neutral";
  delete fixedProps.className;

  return (
    <button
      className={`rounded-lg font-bold  disabled:bg-gray-400 text-gray-50 transition-colors duration-300 
      ${fixedProps.purpose === "neutral" && "bg-primary-500 hover:bg-accent-500 focus:bg-accent-700"}
      ${fixedProps.purpose === "success" && "bg-emerald-500 hover:bg-emerald-400 focus:bg-emerald-600"}
      ${fixedProps.purpose === "danger" && "bg-red-500 hover:bg-red-400 focus:bg-red-600"}
       ${props.className}`}
      {...fixedProps}
    >
      {props.children}
    </button>
  );
}
