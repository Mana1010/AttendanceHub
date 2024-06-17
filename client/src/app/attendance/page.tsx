"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IoSearchOutline } from "react-icons/io5";
import NotFound from "@/components/NotFound";
import EmptyUser from "@/components/EmptyUser";
import { differenceInMinutes } from "date-fns";
export interface Payload {
  user_id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  age: number;
  gender: string;
  role: string;
  reason: string;
  is_trash: boolean;
  qr_code: string;
  time_in: number;
  time_out: number | null;
  date_created: Date;
  date_updated: Date;
}
export interface UserData {
  data: Payload;
}
function Attendance() {
  const router = useRouter();
  const [activeUsers, setActiveUsers] = useState<Payload[] | null | undefined>(
    null
  );
  const [searchName, setSearchName] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const getAllUsers = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://127.0.0.1:8000/get_users");
      const filteredArr = response.data.message.filter(
        (user: Payload) => !user.time_out && !user.is_trash
      );
      setActiveUsers(filteredArr);
      return response.data.message;
    },
  });

  const timeOutMutation = useMutation({
    mutationFn: async (data: Payload) => {
      const date = new Date(data.date_created).getTime();
      const timeConsumed = differenceInMinutes(new Date().getTime(), date);
      const formData = new FormData();
      const payload = {
        timeOut: Date.now(),
        user_id: data.user_id,
        timeConsumed,
      };
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
  const totalTimeOut = getAllUsers?.data?.filter(
    (user: Payload) => user.time_out
  );

  const searchFilterName = activeUsers?.filter((user: Payload) =>
    new RegExp(searchName.trim(), "i").test(
      `${user.first_name.toLowerCase()} ${
        user.middle_name ? user.middle_name.toLowerCase() : "".trim()
      } ${user.last_name.toLowerCase()}}`
    )
  );
  function handleSortBy(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    setSortBy(value);
    if (value === "a-z") {
      const sortUserAZ = activeUsers?.sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );
      setActiveUsers(sortUserAZ);
    } else if (value === "z-a") {
      const sortUserZA = activeUsers?.sort((b, a) =>
        a.first_name.localeCompare(b.first_name)
      );
      setActiveUsers(sortUserZA);
    } else if (value === "old") {
      const sortUserOldest = activeUsers?.sort((a, b) => a.time_in - b.time_in);
      setActiveUsers(sortUserOldest);
    } else {
      const sortUserLatest = activeUsers?.sort((b, a) => a.time_in - b.time_in);
      setActiveUsers(sortUserLatest);
    }
  }
  if (getAllUsers.isLoading) {
    return <h1>LOADINGGGGG</h1>;
  }
  return (
    <div className="w-full h-full flex flex-col relative">
      <header className="grid space-x-2 grid-cols-2 p-2">
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
            TOTAL OFFLINE USERS
          </h3>
        </div>
      </header>
      <div className="flex-grow px-3 space-y-2 flex flex-col overflow-y-auto">
        <div className="w-full flex justify-between items-center px-2">
          <div className=" w-1/2 flex rounded-sm border-[1px] border-primary">
            <label
              htmlFor="search-user"
              className="px-3 rounded-sm bg-primary text-white flex items-center justify-center"
            >
              <IoSearchOutline />
            </label>
            <input
              id="search-user"
              type="text"
              onChange={(e) => setSearchName(e.target.value)}
              value={searchName}
              placeholder="Search active user"
              className="py-2 px-1 outline-none text-primary flex-grow"
            />
          </div>
          <div className="space-x-1 flex items-center">
            <select
              onChange={handleSortBy}
              value={sortBy}
              className="border-[1px] border-primary text-secondary px-3 py-1 cursor-pointer outline-none"
            >
              <option value="" hidden>
                Sort By
              </option>
              <option value={"a-z"}>Name A-Z</option>
              <option value={"z-a"}>Name Z-A</option>
              <option value={"new"}>Time In (Latest)</option>
              <option value={"old"}>Time In (Oldest)</option>
            </select>
          </div>
        </div>
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
          {!activeUsers?.length && !searchName.trim() ? (
            <EmptyUser />
          ) : !searchFilterName?.length && searchName.trim() ? (
            <NotFound search={searchName} />
          ) : (
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
                {searchFilterName?.map((user: Payload, index: number) => (
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
                        : "----"}
                    </td>
                    <td className="text-center text-[0.8rem] space-x-2 p-2">
                      <button
                        onClick={() =>
                          router.push(
                            `/attendance/full-details/${user.user_id}`
                          )
                        }
                        className="px-2.5 py-2 bg-primary text-white rounded-md"
                      >
                        Full Details
                      </button>

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
          )}
        </div>
      </div>
    </div>
  );
}

export default Attendance;
