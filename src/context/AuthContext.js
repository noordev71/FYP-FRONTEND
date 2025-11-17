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
  const [totalCredits, setTotalCredits] = useState(null);
  const [usedCredits, setUsedCredits] = useState(null);
  const [overallCredits, setOverallCredits] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isFreeTrial, setIsFreeTrial] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [name, setName] = useState();
  const [isGuest, setIsGuest] = useState(false);

  const pathname = usePathname();

  const router = useRouter();
  const { checkIfUserValidated } = useSettings();

  const cutTotalCreditsHandler = (creditsToCut) => {
    if (creditsToCut > totalCredits) {
      console.error("Insufficient credits");
    } else {
      const totalRemainingCredits = Number(totalCredits - creditsToCut).toFixed(
        1
      );
      const creditsUsed = Number(usedCredits + creditsToCut).toFixed(1);
      setTotalCredits(totalRemainingCredits);
      setUsedCredits(creditsUsed);
    }
  };

  const validateToken = async () => {
    try {
      const result = await checkIfUserValidated();
      if (result.status === 200) {
        if (!result.valid) {
          router.push("/login");
          return;
        }
        setUserIsValid(result.valid);
        setTotalCredits(Number(result.total_credits));
        setUsedCredits(Number(result.total_credits_used));
        setOverallCredits(Number(result.overall_total_credits));
        setIsExpired(result.is_expired);
        setLoading(false);
        setIsPremium(result.is_paying);
        // setIsFreeTrial(result.is_free_trial);
        setName(result.name);
        setIsSubscribed(result.is_subscribed);
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
        totalCredits,
        usedCredits,
        isExpired,
        setIsExpired,
        overallCredits,
        isPremium,
        // isFreeTrial,
        name,
        isSubscribed,
        isGuest,
        cutTotalCreditsHandler,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
