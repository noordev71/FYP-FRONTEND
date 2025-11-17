const { useState } = require("react");
import { z } from "zod";
import useAuth from "@/hooks/auth/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const signupSchema = z
  .object({
    firstName: z.string().min(1, "First Name Is Empty"),
    lastName: z.string().min(1, "Last Name Is Empty"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/,
        "Password must contain 8 letters, including 1 uppercase letter, 1 number, and 1 special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const useSignup = () => {
  const router = useRouter();
  const cookie = new Cookies();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { register } = useAuth();

  const checkboxHandler = (event: any) => {
    setIsChecked(event?.target.checked);
  };

  const handleSignup = async () => {
    console.log("INSIDE");
    if (!isChecked) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    // try {
    //   signupSchema.parse({
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     confirmPassword,
    //   });
    // } catch (error) {
    //   if (error instanceof z.ZodError) {
    //     console.log("ERROR", error);
    //     toast.error(error.message);
    //     return;
    //   }
    // }
    console.log("RAISE");
    setIsLoading(true);
    const result = await register({ email, password, firstName, lastName });
    if (result.error) {
      setIsLoading(false);
      return;
    }
    toast("Successful Signup");
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
      router.push(`/`);
    }, 2000);
  };

  return {
    isLoading,
    handleSignup,
    firstName,
    setConfirmPassword,
    setEmail,
    setFirstname,
    setLastname,
    setPassword,
    confirmPassword,
    email,
    password,
    lastName,
    checkboxHandler,
  };
};
