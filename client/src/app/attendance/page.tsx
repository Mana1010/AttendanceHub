"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export interface Payload {
  user_id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  age: number;
  gender: string;
  role: string;
  reason: string;
  qr_code: string;
  time_in: number;
  time_out: number;
  date_created: Date;
  date_updated: Date;
}
export interface UserData {
  data: Payload;
}
function Attendance() {
  const router = useRouter();
  const getAllUsers = useQuery<Payload[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://127.0.0.1:8000/get_users");
      return response.data.message;
    },
  });
  const timeOutMutation = useMutation({
    mutationFn: async (data: Payload) => {
      const formData = new FormData();
      const payload = { timeOut: Date.now(), user_id: data.user_id };
      for (let [key, value] of Object.entries(payload)) {
        formData.append(key, value.toString());
      }

      const response = await axios.post(
        `http://127.0.0.1:8000/time_out_user/${payload.user_id}`,
        formData
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      getAllUsers.refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const activeUsers = getAllUsers?.data?.filter(
    (user: Payload) => !user.time_out
  );
  const totalTimeOut = getAllUsers?.data?.filter(
    (user: Payload) => user.time_out
  );
  return (
    <div className="w-full h-full flex flex-col relative">
      <header className="grid space-x-2 md:grid-cols-3 grid-cols-2 p-2">
        <div className="rounded-md py-2 px-5 border-zinc-300 border-[1px] h-[100px] flex space-x-2 flex-col items-center space-y-1">
          <h1 className="font-bold text-3xl text-[#374B65]">
            {getAllUsers.data && getAllUsers.data?.length}
          </h1>
          <h3 className="text-[1rem] text-primary font-semibold">
            TOTAL USERS
          </h3>
        </div>
        <div className="rounded-md py-2 px-5 border-zinc-300 border-[1px] h-[100px] flex space-x-2 flex-col items-center space-y-1">
          <h1 className="font-bold text-3xl text-[#374B65]">
            {getAllUsers.isLoading ? "Loading...." : activeUsers?.length}
          </h1>
          <h3 className="text-[1rem] text-primary font-semibold">
            TOTAL ACTIVE USERS
          </h3>
        </div>
        <div className="rounded-md py-2 px-5 border-zinc-300 border-[1px] h-[100px] flex space-x-2 flex-col items-center space-y-1">
          <h1 className="font-bold text-3xl text-[#374B65]">
            {" "}
            {getAllUsers.isLoading ? "Loading...." : totalTimeOut?.length}
          </h1>
          <h3 className="text-[1rem] text-primary font-semibold">
            TOTAL TIME OUT
          </h3>
        </div>
      </header>
      <div className="flex-grow px-3 space-y-2 flex flex-col overflow-y-auto">
        <div className="flex justify-end w-full">
          <button
            onClick={() => router.push("/login")}
            className="rounded-sm bg-primary flex space-x-2 items-center px-3.5 py-2 text-white"
          >
            <span className="font-bold text-md">
              <FaPlus />
            </span>
            <h2> ADD NEW</h2>
          </button>
        </div>
        <div>
          <table className="w-full border-collapse">
            <thead className="p-2 sticky top-0 bg-white border-zinc-500">
              <tr>
                <th>USER ID</th>
                <th>NAME</th>
                <th>ROLE</th>
                <th>REASON</th>
                <th>TIME IN</th>
                <th>TIME OUT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {getAllUsers.data?.map((user: any, index: number) => (
                <tr
                  key={user.user_id}
                  className={`${
                    index % 2 === 0
                      ? "bg-violet-500 text-white"
                      : "bg-white textt-secondary"
                  }`}
                >
                  <td className="text-center py-2 px-2 w-[100px] text-[0.8rem]">
                    {user.user_id}
                  </td>
                  <td className="text-center py-2 px-2 w-[150px] text-[0.8rem]">{`${user.first_name} ${user.middle_name} ${user.last_name}`}</td>
                  <td className="text-center py-2 px-2 w-[100px] text-[0.8rem]">
                    {user.role}
                  </td>
                  <td className="text-center py-2 px-2 w-[150px] text-[0.8rem]">
                    {user.reason.length < 15
                      ? user.reason
                      : `${user.reason.slice(0, 30)}...`}
                  </td>
                  <td className="text-center text-[0.8rem] px-2 w-[150px]">
                    {new Date(user.time_in).toLocaleString()}
                  </td>
                  <td className="text-center text-[0.8rem] px-2 w-[150px]">
                    {user.time_out
                      ? new Date(user.time_out).toLocaleString()
                      : ""}
                  </td>
                  <td className="text-center text-[0.8rem] px-2 space-x-2">
                    <button
                      onClick={() =>
                        router.push(`/attendance/full-details/${user.user_id}`)
                      }
                      className="px-2.5 py-2 bg-primary text-white rounded-md"
                    >
                      Full Details
                    </button>
                    {/* <button className="px-2.5 py-2 bg-primary text-white rounded-md">
                      Edit
                    </button> */}
                    <button
                      onClick={() => timeOutMutation.mutate(user)}
                      className="px-2.5 py-2 bg-primary text-white rounded-md"
                    >
                      Time Out
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
