"use client";
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { utilStore } from "@/store/utils.store";
import { QueryState, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
function Attendance() {
  const router = useRouter();
  const getAllUsers = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://127.0.0.1:8000/get_users");
      return response.data.message;
    },
  });
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
          <h1 className="font-bold text-3xl text-[#374B65]">0</h1>
          <h3 className="text-[1rem] text-primary font-semibold">
            TOTAL ACTIVE USERS
          </h3>
        </div>
        <div className="rounded-md py-2 px-5 border-zinc-300 border-[1px] h-[100px] flex space-x-2 flex-col items-center space-y-1">
          <h1 className="font-bold text-3xl text-[#374B65]">0</h1>
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
                    ---
                  </td>
                  <td className="text-center text-[0.8rem] px-2">---</td>
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
