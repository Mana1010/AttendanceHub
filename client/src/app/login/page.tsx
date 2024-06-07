"use client";
import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
function Login() {
  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);

  // useEffect(() => {
  //   function loadFunc(e: BeforeUnloadEvent) {
  //     e.preventDefault();
  //   }
  //   window.addEventListener("beforeunload", loadFunc);
  //   return () => window.removeEventListener("beforeunload", loadFunc);
  // }, []);

  return (
    <div className=" flex justify-center items-center w-full md:h-screen px-3 bg-primary">
      <div
        className={`w-1/2 p-3 bg-white rounded-md flex space-y-3 flex-col justify-center items-center`}
      >
        <div className="w-full pb-2 space-y-2">
          <header className="flex justify-between items-center w-ful">
            <h2 className="text-secondary text-xl font-bold">
              Already a Member?
            </h2>
            <button
              onClick={() => router.push("/attendance")}
              className="text-lg text-primary"
            >
              <FaXmark />
            </button>
          </header>
          <form className="flex-col flex w-full space-y-2">
            <div>
              <label className="text-[1rem] text-primary font-bold">
                Enter Code
              </label>
              <input
                onChange={(e) => setCode(e.target.value)}
                value={code ?? ""}
                type="text"
                placeholder="@e.g x6He8"
                className="w-full py-3 px-2 bg-slate-200 rounded-md outline-[1px] outline-primary placeholder:text-slate-500 text-sm font-bold text-primary"
              />
            </div>
            <button className="w-full py-2.5 text-white bg-primary rounded-md">
              Enter Code
            </button>
          </form>
        </div>
        <h2 className="text-primary font-extrabold text-xl">OR</h2>
        <div className="w-full pb-2 space-y-2">
          <h2 className="text-secondary text-xl font-bold">New Here?</h2>
          <button
            onClick={() => router.push("/register")}
            className="w-full py-2.5 text-white bg-primary rounded-md"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
