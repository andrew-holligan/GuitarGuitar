import { AllHTMLAttributes } from "react";

function Logo(props: AllHTMLAttributes<HTMLHeadingElement>) {
  return (
    <>
      <h1 {...props} className={`font-bold text-primary-500 ${props.className}`}>
        GuitarGuitar
      </h1>
    </>
  );
}

export default Logo;
