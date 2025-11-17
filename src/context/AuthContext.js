"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

import useSettings from "@/hooks/settings/useSettings";
import { usePathname } from "next/navigation";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userIsValid, setUserIsValid] = useState(null);

  const [name, setName] = useState();
  const [isGuest, setIsGuest] = useState(false);

  const pathname = usePathname();

  const router = useRouter();
  const { checkIfUserValidated } = useSettings();

  const validateToken = async () => {
    try {
      const result = await checkIfUserValidated();
      if (result.status === 200) {
        if (!result.valid) {
          router.push("/login");
          return;
        }
        setUserIsValid(result.valid);
        setLoading(false); // setIsFreeTrial(result.is_free_trial);
        setName(result.name);
        setIsGuest(false);
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  };

  useEffect(() => {
    const authenticateUser = async () => {
      if (pathname.includes("details")) {
        setIsGuest(true);
      } else {
        await validateToken();
      }
    };
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: userIsValid,
        loading,
        name,
        isGuest,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
