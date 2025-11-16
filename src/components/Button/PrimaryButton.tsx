import ButtonLoader from "../Utilities/ButtonLoader";

export const PrimaryButton = (props: any) => {
  const { type, className, isLoading, ...rest } = props;
  return (
    <button
      disabled={isLoading}
      type={type}
      className={
        "w-full text-black cursor-pointer py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold bg-primary rounded-lg border border-transparent disabled:opacity-70 disabled:pointer-events-none transition-all duration-200 transform hover:-translate-y-1 hover:opacity-[0.8] " +
        className
      }
      {...rest}
    >
      {isLoading ? <ButtonLoader /> : props.children}
    </button>
  );
};
