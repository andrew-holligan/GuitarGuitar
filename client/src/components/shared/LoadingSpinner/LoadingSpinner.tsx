import { AllHTMLAttributes } from "react";
import "./LoadingSpinner.scss";

function LoadingSpinner(props: AllHTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={`flex justify-center items-center ${props.className}`}>
      <div className="lds-ellipsis mt-1 text-accent-500">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
