import { LabelHTMLAttributes } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export default function Label(props: LabelProps) {
  const propsNoClassName = { ...props };
  delete propsNoClassName.className;

  return (
    <label {...propsNoClassName} className={`text-sm font-bold ${props.className}`}>
      {props.children}
      {props.required && <span className=" text-light opacity-40">*</span>}
    </label>
  );
}
