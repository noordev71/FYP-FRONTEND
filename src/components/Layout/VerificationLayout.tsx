"use client";
import { useEffect } from "react";
import SideNav from "../HomePage/SideNav";
import { useAuthContext } from "@/context/AuthContext";
import { PrimaryButton } from "../Button/PrimaryButton";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import useSettings from "@/hooks/settings/useSettings";

export default function Default(props: any) {
  const { checkIfUserValidated } = useSettings();
  const router = useRouter();
  const authCtx = useAuthContext();
  const pathname = usePathname();

  if (
    !authCtx.isGuest &&
    (authCtx.user === false || authCtx.user === undefined)
  ) {
    router.push("/login");
  }

  useEffect(() => {
    const isUserValid = async () => {
      const response = await checkIfUserValidated();
      if (!response.valid) {
        router.push("/login");
      }
    };
    if (!pathname.includes("details")) {
      isUserValid();
    }
  }, [pathname]);
  return authCtx.user === null && !authCtx.isGuest ? null : (
    <section className="flex w-full justify-between min-h-screen">
      {authCtx.user && <SideNav />}
      <section className="flex flex-col w-full ml-20">
        {/* <Navbar /> */}
        <main className="mt-5 p-4 mx-auto container text-white w-full">
          {props.children}
        </main>
      </section>
    </section>
  );
}
