import React from "react";

const Loader = (props: any) => {
  return (
    <div
      className={`flex items-center justify-center ${
        props.forPage ? "h-screen" : "h-fit"
      }`}
    >
      <div className="rounded-xl p-4 ">
        <div className="flex items-center gap-x-3">
          <div
            className="w-8 h-8 bg-primary rounded-full animate-bounce"
            role="status"
            aria-label="loading"
          ></div>
          <div
            className="w-8 h-8 bg-primary rounded-full animate-bounce delay-75"
            role="status"
            aria-label="loading"
          ></div>
          <div
            className="w-8 h-8 bg-primary rounded-full animate-bounce delay-150"
            role="status"
            aria-label="loading"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
