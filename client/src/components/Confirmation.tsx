"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { QueryClient } from "@tanstack/react-query";
interface Confirmation {
  children: React.ReactNode;
}
function Confirmation({
  data,
  setIsConfirm,
}: {
  data: any;
  setIsConfirm: any;
}) {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const deleteTrashPermanently = useMutation({
    mutationFn: async (confirmation: string) => {
      const payload = new FormData();
      payload.append("confirmation", confirmation);
      const response = await axios.post(
        "http://127.0.0.1:8000/delete_all_user_permanently",
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        setIsConfirm(false);
        queryClient.invalidateQueries();
      } else {
        toast.error(data.message);
      }
    },
  });
  return (
    <div className="w-full h-screen bg-slate-950/55 flex items-center justify-center absolute inset-0">
      <div className="p-3 flex items-center justify-center flex-col space-y-4 bg-white w-1/3 h-[200px] rounded-md">
        <p className="text-secondary font-bold text-center text-[0.75rem]">
          Type &quot;
          <span className="text-primary">attendance_hub_confirm_deletion</span>
          &quot; to confirm.
        </p>{" "}
        <input
          type="text"
          placeholder="Code"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full py-2 border-[1px] outline-primary text-primary px-2 rounded-sm text-sm border-primary"
        />
        <div className="space-x-3 flex w-full justify-center items-center">
          <button
            onClick={() => setIsConfirm(false)}
            className="py-2 w-1/4 border-[1px] border-primary text-primary rounded-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteTrashPermanently.mutate(text)}
            className="py-2 w-1/4 bg-primary text-white rounded-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
