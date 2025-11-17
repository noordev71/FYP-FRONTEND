const { useState } = require("react");
import { z } from "zod";
import useAuth from "@/hooks/auth/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const useLogin = () => {
  const router = useRouter();

  const cookie = new Cookies();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const handleLogin = async () => {
    try {
      loginSchema.parse({ email });
      setIsLoading(true);
      const result = await login(email, password);
      console.clear();
      if (result.error) {
        setIsLoading(false);
        if (result.detailError === "User is not verified yet, OTP code sent") {
          // router.push(`/otp-verification?email=${email}`);
        }
        return;
      } else {
        toast(result.message);
        cookie.set("token", result.access_token, {
          path: "/",
          domain: process.env.STORE_COOKIE_URL,
        });
        cookie.set("refresh_token", result.refresh_token, {
          path: "/",
          domain: process.env.STORE_COOKIE_URL,
        });
        cookie.set("name", result.full_name, {
          path: "/",
          domain: process.env.STORE_COOKIE_URL,
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast(err.message, { type: "error" });
        });
      } else {
        toast("An unexpected error occurred", { type: "error" });
        return;
      }
    }
  };

  const handleEnterLogin = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return {
    isLoading,
    handleLogin,
    email,
    setEmail,
    password,
    setPassword,
    handleEnterLogin,
  };
};
