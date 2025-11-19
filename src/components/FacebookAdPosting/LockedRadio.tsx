import React from "react";
import MiniLock from "@/assets/images/authPage.png";
import Image from "next/image";
interface RadioProps {
  value: string;
  disabled?: boolean;
  handleClick?: () => void;
  premium: boolean;
  selectedMode: string;
}
const LockedRadio: React.FC<RadioProps> = ({
  value,
  disabled,
  handleClick,
  premium,
  selectedMode,
}) => {
  return (
    <div
      onClick={handleClick}
      className={`px-2.5 transition-all duration-200 hover:text-primary hover:cursor-pointer w-fit relative ${
        !(selectedMode === value) ? " " : "text-primary font-bold"
      } `}
    >
      {disabled && (
        <Image
          src={MiniLock}
          width={32}
          height={32}
          alt="Premium Package"
          className="absolute -left-2 -top-5"
        />
      )}
      <div className={"flex items-center gap-x-1 h-full"}>
        {/* {!premium ? (
          <Image src={Pencil} width={20} height={20} alt="Premium Package" />
        ) : (
          <Image src={Bolt} width={20} height={20} alt="Premium Package" />
        )} */}

        <p className={`text-sm`}>{value}</p>
      </div>
    </div>
  );
};
export default LockedRadio;
