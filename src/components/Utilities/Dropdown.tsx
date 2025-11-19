import Select from "react-select";
import { useState, useEffect, Fragment } from "react";

interface DropdownProps {
  options: Array<any>;
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [currentValue, setCurrentValue] = useState(options[0]);

  const changeHandler = (selectedOption: any) => {
    setCurrentValue(selectedOption.value);
  };

  useEffect(() => {
    setCurrentValue(options[0]);
  }, [options]);

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "transparent",
      boxShadow: "none",
      color: "#bdbfd4",
      padding: "0.5rem 0 0.5rem 0",
      borderRadius: "0.5rem",
      border: "1px solid #2e2f45",
      cursor: "pointer",
      "&:hover": {
        border: "1px solid #e6f85e",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#171825",
      borderRadius: "0.5rem",
      border: "none",
      boxShadow: "none",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#e6f85e"
        : state.isFocused
          ? "#e6f85e"
          : "",
      color: state.isSelected || state.isFocused ? "#000" : "#bdbfd4",
      padding: "0.5rem",
      cursor: "pointer",
      borderRadius: "0.5rem",
      transition: "all duration-200",
      "&:active ": {
        background: "#e6f85e",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#FFFFFF",
    }),
  };
  return (
    <div className="flex flex-col">
      <label className="block text-xl mb-2 dark:text-white font-bold">Select tone</label>
      <Select
        options={options.map((option: any) => ({
          value: option,
          label: option,
        }))}
        value={{
          value: currentValue,
          label: currentValue,
        }}
        styles={customStyles}
        isSearchable={false}
        name="tone"
        onChange={(event: any) => {
          changeHandler(event);
        }}
      />
    </div>
  );
};

export default Dropdown;
