"use client";

import React, { useState, Fragment } from "react";
import {
  FaHome,
  FaFacebookF,
  FaLinkedinIn,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaFileAlt,
  FaChevronRight,
  FaChevronLeft,
  FaFileImage,
} from "react-icons/fa";
import { BsFiletypeDoc } from "react-icons/bs";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/auth/useAuth";
import Image from "next/image";
import { PrimaryButton } from "../Button/PrimaryButton";
import logo from "@/assets/images/authPage.png";
import { Tooltip as ReactTooltip } from "react-tooltip";

const sidebarItems = [
  {
    text: "Dashboard",
    to: "/",
    icon: <FaHome className="w-full h-full" />,
    id: "i1",
  },
  {
    text: "Document",
    to: "/custom-doc",
    icon: <BsFiletypeDoc className="w-full h-full" />,
    id: "i6",
  },
  {
    text: "Facebook",
    to: "/facebook-add-mastery",
    icon: <FaFacebookF className="w-full h-full" />,
    id: "i2",
  },
  {
    text: "LinkedIn",
    to: "/linkedin-add-mastery",
    icon: <FaLinkedinIn className="w-full h-full" />,
    id: "i3",
  },
  {
    text: "Email",
    to: "/email-marketing",
    icon: <FaEnvelope className="w-full h-full" />,
    id: "i4",
  },
  {
    text: "Article",
    to: "/article-add-mastery",
    icon: <FaFileAlt className="w-full h-full" />,
    id: "i5",
  },

  // {
  //   text: "Settings",
  //   to: "/settings/profile",
  //   icon: <FaCog className="w-full h-full" />,
  //   id: "i6",
  // },
];

export default function SideNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const logoutHandler = async () => {
    await logout();
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`px-4 py-6 flex flex-col items-center justify-between fixed h-full bg-blue transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      } z-[1000]`}
    >
      <div className="flex flex-col items-center gap-y-6 w-full justify-between h-full">
        <div className="flex items-center justify-between w-full">
          {isExpanded && (
            <Image
              src={logo}
              alt="Company Logo"
              width={70}
              height={100}
              className="rounded-full"
            />
          )}
          <PrimaryButton
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-primary hover:text-black w-fit"
          >
            {isExpanded ? (
              <FaChevronLeft className="h-4 w-4" />
            ) : (
              <FaChevronRight className="h-4 w-4" />
            )}
          </PrimaryButton>
        </div>

        <div className="flex flex-col items-center gap-y-2 w-full gap-4 h-full">
          {sidebarItems.map((item) => (
            <Fragment key={item.id}>
              <Link
                href={item.to}
                className={`w-full p-2 rounded-md transition-all duration-300 flex items-center ${
                  pathname === item.to ||
                  pathname.includes(item.text.toLowerCase()) ||
                  (pathname.includes(item.to) && item.to !== "/")
                    ? "bg-primary text-black"
                    : "text-white hover:bg-primary hover:text-black"
                }`}
                data-tooltip-id={`tooltip-${item.id}`}
                data-tooltip-content={item.text}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {item.icon}
                </div>
                {isExpanded && (
                  <span className="ml-2 text-sm">{item.text}</span>
                )}
              </Link>
              <ReactTooltip
                id={`tooltip-${item.id}`}
                place="right"
                className="z-[10000]"
              />
            </Fragment>
          ))}
        </div>

        <div className="flex flex-col gap-y-2 gap-4 w-full h-fit">
          {/* <Link
            href={`settings/profile`}
            className={`w-full p-2 rounded-md transition-all duration-300 flex items-center ${pathname.includes("settings")
              ? "bg-primary text-black"
              : "text-white hover:bg-primary hover:text-black"
              }`}
            data-tooltip-id={`tooltip-s1`}
            data-tooltip-content={`Settings`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <FaCog className="w-full h-full" />
            </div>
            {isExpanded && <span className="ml-2 text-sm">Settings</span>}
          </Link> */}
          <ReactTooltip id={`tooltip-s1`} place="right" className="z-[10000]" />
          <div className="w-full">
            <PrimaryButton onClick={logoutHandler}>
              <div className="w-full flex items-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <FaSignOutAlt className="w-full h-full" />
                </div>
                {isExpanded && <span className="ml-2 text-sm">Logout</span>}
              </div>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
