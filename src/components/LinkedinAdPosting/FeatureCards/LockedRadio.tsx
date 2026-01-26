import { MdLockOutline } from "react-icons/md";
import React from "react";
import { IconType } from "react-icons";
import Bolt from "@/assets/images/paid-feature.png";
import MiniLock from "@/assets/images/lock-mini.png";
import Image from "next/image";
import Pencil from "@/assets/images/pencil.png";

interface RadioProps {
  value: string;
  disabled?: boolean;
  selectedItem: string;
  label: string;
  Icon?: IconType;
  handleClick?: () => void;
  ImageIcon?: any;
}
const LockedRadio: React.FC<RadioProps> = ({
  value,
  disabled,
  handleClick,
  selectedItem,
  label,
  Icon,
  ImageIcon,
}) => {
  return (
    <div
      onClick={handleClick}
      className={`mt-4 rounded-xl px-2.5 py-4 hover:cursor-pointer  w-fit bg-white relative ${
        !(label === selectedItem)
          ? "border border-[#d3d3d3]"
          : "gradient-border"
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
        {label === "Standard" ? (
          <Image src={Pencil} width={20} height={20} alt="Premium Package" />
        ) : (
          <Image src={Bolt} width={20} height={20} alt="Premium Package" />
        )}

        <p className={`text-sm font-normal`}>{value}</p>
      </div>
    </div>
  );
};
export default LockedRadio;
