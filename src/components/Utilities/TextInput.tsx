import React, { useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { CiCircleInfo } from "react-icons/ci";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface TextInputProps {
  value?: string;
  initialValue?: string;
  setValue?: (value: string) => void;
  label: string;
  type?: string;
  placeholder?: string;
  forgotPassword?: boolean;
  textArea?: boolean;
  rows?: number;
  required?: boolean;
  maxLength?: number;
  secondaryText?: string;
  name?: string;
  className?: string;
  toolTipText?: string;
  icon?: StaticImageData;
  isInputPrimary?: boolean;
  canEdit?: boolean;
  onBlur?: any;
}

const inputClass =
  "bg-transparent w-full text-md py-4 px-2 border border-[#2e2f45] text-[#bdbfd4] rounded-lg transition-all duration-150    focus:border-primary focus:ring-2 focus:ring-primary/40 focus:outline-none";

const TextInput: React.FC<TextInputProps> = ({
  value,
  initialValue = "",
  setValue,
  label,
  placeholder = "",
  type = "text",
  forgotPassword = false,
  textArea,
  required = false,
  secondaryText = "",
  name = "",
  icon = "",
  toolTipText = "some random tooltip text",
  isInputPrimary = true,
  canEdit = true,
  ...rest
}) => {
  return (
    <div className="w-full">
      {forgotPassword ? (
        <div className="flex justify-between items-center">
          <label htmlFor={label} className="block text-sm mb-2 dark:text-white">
            Password
          </label>
          <Link
            className="text-sm text-primary decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
      ) : (
        <label htmlFor={label} className="block text-sm mb-2 dark:text-white">
          {label}
          <span className="text-xs text-gray-600 ml-1">{secondaryText}</span>
          {isInputPrimary && (
            <span className={`${required ? "inline text-red-500" : "hidden"}`}>
              *
            </span>
          )}
          {isInputPrimary && (
            <CiCircleInfo
              data-tooltip-id={label}
              className="inline-block ml-2 hover:cursor-pointer"
              size={18}
            />
          )}
        </label>
      )}
      {isInputPrimary && (
        <ReactTooltip
          id={label}
          place="top"
          content={toolTipText}
          className="z-[1000]"
        />
      )}
      <div className="relative">
        {textArea ? (
          <textarea
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue && setValue(e.target.value)}
            className={inputClass}
            name={name}
          ></textarea>
        ) : (
          <div className={``}>
            {/* {icon && (
              <Image src={icon} className="w-10 h-10 pl-4 mr-3" alt="icon" />
            )} */}
            <input
              className={inputClass}
              defaultValue={initialValue}
              placeholder={placeholder}
              onChange={setValue ? (e) => setValue(e.target.value) : undefined}
              type={type}
              name={name}
              required
              aria-describedby="email-error"
              disabled={!canEdit}
              {...rest}
            />
          </div>
        )}
      </div>
      <p className="hidden text-xs text-red-600 mt-2" id="password-error">
        8+ characters required
      </p>
    </div>
  );
};

export default TextInput;

export const PrimaryTextInput: React.FC<TextInputProps> = (props) => {
  const {
    value,
    setValue,
    label,
    placeholder = "",
    type = "text",
    secondaryText = "",
    required = false,
    name = "",
    textArea = false,
    rows = 1,
    maxLength = 100,
    toolTipText = label,
    ...rest
  } = props;

  return (
    <div className="w-full">
      <label htmlFor={label} className="block text-sm mb-2 dark:text-white">
        {label}
        <span className="text-xs text-gray-600 ml-1">{secondaryText}</span>
        <span className={`${required ? "inline text-red-500" : "hidden"}`}>
          *
        </span>
        <CiCircleInfo
          data-tooltip-id={label}
          className="inline-block ml-2 hover:cursor-pointer"
          size={18}
        />
      </label>

      <ReactTooltip
        id={label}
        place="top"
        content={toolTipText}
        className="z-[1000]"
      />
      <div className="relative">
        {textArea ? (
          <textarea
            rows={rows}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            name={name}
            {...rest}
            required={required}
            className={
              "py-3 px-4 block w-full border-[0.5px] border-color rounded-lg text-sm text-black border-gradient-input-field focus:ring-0 focus-within:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:focus:ring-gray-600 " +
              props.className
            }
            aria-describedby="email-error"
          ></textarea>
        ) : (
          <input
            value={value}
            placeholder={placeholder}
            type={type}
            name={name}
            {...rest}
            required={required}
            className={` bg-transparent w-full`}
            aria-describedby="email-error"
          />
        )}
      </div>
    </div>
  );
};
