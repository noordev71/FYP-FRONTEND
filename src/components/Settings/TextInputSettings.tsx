import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons from react-icons

interface TextInputProps {
  type?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  setValue?: (value: string) => void;
  disabled?: boolean;
}

const TextInputSettings: React.FC<TextInputProps> = ({
  type = "text",
  placeholder = "",
  className = "",
  value = "",
  setValue,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : type}
        className={`py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
        disabled={disabled}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      )}
    </div>
  );
};

export default TextInputSettings;
