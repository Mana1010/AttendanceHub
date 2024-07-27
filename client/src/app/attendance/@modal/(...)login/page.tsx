"use client";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
const codeSchema = z.object({
  code: z.string().min(1, "This field is required").max(5, "5 characters only"),
});
function Login() {
  const router = useRouter();
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const enterCodeMutation = useMutation({
    mutationFn: async (code: string) => {
      const payload = new FormData();
      payload.append("code", code);
      const response = await axios.post(
        "http://127.0.0.1:8000/enter_code",
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        router.push(`login/edit/${data.user_id}`);
      } else {
        toast.error(data.message);
      }
      setError("");
    },
  });
  return (
    <div className=" flex justify-center items-center w-full md:h-screen px-3 bg-black/40 backdrop-blur-md absolute inset-0">
      <div
        className={`w-1/2 p-3 bg-white rounded-md flex space-y-3 flex-col justify-center items-center`}
      >
        <div className="w-full pb-2 space-y-2">
          <header className="flex justify-between items-center w-ful">
            <h2 className="text-secondary text-xl font-bold">
              Already a Member?
            </h2>
            <button
              onClick={() => router.back()}
              className="text-lg text-primary"
            >
              <FaXmark />
            </button>
          </header>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const payload = codeSchema.safeParse({ code });
              if (payload.success) {
                enterCodeMutation.mutate(code);
              } else {
                setError(payload.error.issues[0].message);
              }
            }}
            className="flex-col flex w-full space-y-2"
          >
            <div>
              <label className="text-[1rem] text-primary font-bold">
                Enter Code
              </label>
              <input
                onChange={(e) => setCode(e.target.value)}
                value={code}
                type="text"
                placeholder="@e.g x6He8"
                className="w-full py-3 px-2 bg-slate-200 rounded-md outline-[1px] outline-primary placeholder:text-slate-500 text-sm font-bold text-primary"
              />
              {error && (
                <p className="text-red-500 text-[0.8rem] font-bold">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2.5 text-white bg-primary rounded-md"
            >
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
