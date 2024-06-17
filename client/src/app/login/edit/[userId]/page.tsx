"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { toast } from "sonner";
interface Params {
  params: {
    userId: string;
  };
}
const reasonSchema = z.object({
  reason: z.string().min(1, "This field is required"),
});
function Edit({ params }: Params) {
  const router = useRouter();
  const [reason, setReason] = useState<string>("");
  const [error, setError] = useState<string>("");
  const getNameAndReason = useQuery({
    queryKey: ["name_and_reason", params.userId],
    queryFn: async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/get_name_and_reason_user/${params.userId}`
      );
      setReason(response.data?.message.reason);
      return response.data.message;
    },
  });
  const editReasonMutation = useMutation({
    mutationFn: async (reason: string) => {
      const payload = new FormData();
      const timeIn = Date.now();
      payload.append("timeIn", timeIn.toString());
      payload.append("reason", reason);
      const response = await axios.post(
        `http://127.0.0.1:8000/edit_reason/${params.userId}`,
        payload
      );
      return response.data.message;
    },
    onSuccess: (data) => {
      router.push("/attendance");
      toast.success(data);
    },
  });
  return (
    <div className=" flex justify-center items-center w-full md:h-screen px-3 bg-primary">
      <div
        className={`w-1/2 p-3 bg-white rounded-md flex space-y-3 flex-col justify-center items-center`}
      >
        <div className="w-full pb-2 space-y-2">
          <header className="flex w-ful">
            <h2 className="text-secondary text-xl font-bold">
              Welcome Back{" "}
              <span className="text-primary">
                {getNameAndReason?.data?.name}
              </span>
            </h2>
          </header>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const payload = reasonSchema.safeParse({ reason });
              if (payload.success) {
                editReasonMutation.mutate(reason);
                setError("");
              } else {
                setError(payload.error.issues[0].message);
              }
            }}
            className="flex-col flex w-full space-y-2"
          >
            <div>
              <label className="text-[1rem] text-primary font-bold">
                Reason of visit
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Your Reason"
                className="w-full py-3 px-2 bg-slate-200 rounded-md outline-[1px] outline-primary text-sm font-bold text-secondary resize-none"
              ></textarea>
              {error && (
                <p className="text-red-500 text-[0.8rem] font-bold">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2.5 text-white bg-primary rounded-md"
            >
              Time In
            </button>
          </form>
        </div>
        <h2 className="text-primary font-extrabold text-xl">OR</h2>
        <div className="w-full pb-2 space-y-2">
          <button
            onClick={() => router.push(`/login/edit-info/${params.userId}`)}
            className="w-full py-2.5 text-white bg-primary rounded-md"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
