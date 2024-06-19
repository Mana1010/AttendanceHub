"use client";
import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Payload } from "../attendance/page";
import { useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import EmptyUser from "@/components/EmptyUser";
import NotFound from "@/components/NotFound";
import { toast } from "sonner";
import Loading from "@/components/Loading";
interface SessionData extends Payload {
  time_visit: number;
  total_time_consumed: number;
}
function SessionLog() {
  const router = useRouter();
  const [sessionData, setSessionData] = useState<
    SessionData[] | null | undefined
  >(null);
  const [searchName, setSearchName] = useState<string>("");
  const [status, setStatus] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [trashes, setTrashes] = useState<number>(0);
  const getAllUsers = useQuery({
    queryKey: ["session-user"],
    queryFn: async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/get_session_logs"
      );
      const data = response.data.message;
      const getTrash = data.filter((trash: SessionData) => trash.is_trash);
      const filteredOutTrash = data.filter(
        (user: SessionData) => !user.is_trash
      );
      setTrashes(getTrash.length);
      setSessionData(filteredOutTrash);
      return data;
    },
  });
  const deleteUser = useMutation({
    mutationFn: async (user_id: number) => {
      const response = await axios.post(
        `http://127.0.0.1:8000/trash_user/${user_id}`,
        null
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        getAllUsers.refetch();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      console.log(data.success);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  if (getAllUsers.isLoading) {
    return <Loading />;
  }
  const searchFilterName = sessionData?.filter((user) =>
    new RegExp(searchName, "i").test(
      `${user.first_name.toLowerCase()} ${
        user.middle_name ? user.middle_name.toLowerCase() : "".trim()
      } ${user.last_name.toLowerCase()}}`
    )
  );
  const getTimeOfflineUser = getAllUsers.data?.filter(
    (data: SessionData) => data.time_out && !data.is_trash
  );
  const getTimeOnlineUser = getAllUsers.data?.filter(
    (data: SessionData) => !data.time_out && !data.is_trash
  );
  const getNonTrashUser = getAllUsers.data.filter(
    (user: SessionData) => !user.is_trash
  );
  function checkStatus(status: string) {
    if (status === "Online") {
      const filteredOnline = getAllUsers.data?.filter(
        (user: SessionData) => !user.time_out && !user.is_trash
      );
      setSessionData(filteredOnline);
    } else if (status === "Offline") {
      const filteredOffline = getAllUsers.data?.filter(
        (user: SessionData) => user.time_out && !user.is_trash
      );
      setSessionData(filteredOffline);
    } else {
      const filteredOutTrash = getAllUsers.data.filter(
        (user: SessionData) => !user.is_trash
      );
      setSessionData(filteredOutTrash);
    }
    setStatus(status);
  }
  function handleSortBy(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    setSortBy(value);
    if (value === "a-z") {
      const sortUserAZ = sessionData?.sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );
      setSessionData(sortUserAZ);
    } else {
      const sortUserZA = sessionData?.sort((b, a) =>
        a.first_name.localeCompare(b.first_name)
      );
      setSessionData(sortUserZA);
    }
  }
  return (
    <main className="w-full p-2">
      <header className="grid grid-cols-4 gap-2">
        <div className="rounded-md py-2 px-5 border-zinc-300 border-[1px] h-[100px] flex space-x-2 flex-col items-center space-y-1">
          <h1 className="font-bold text-3xl text-[#374B65]">
            {getAllUsers.isLoading ? "Loading...." : getTimeOnlineUser?.length}
          </h1>
          <h3 className="text-[1rem] text-primary font-semibold">
            TOTAL ACTIVE USERS
          </h3>
        </div>
        <div className="rounded-md py-2 px-5 border-zinc-300 border-[1px] h-[100px] flex space-x-2 flex-col items-center space-y-1">
          <h1 className="font-bold text-3xl text-[#374B65]">
            {" "}
            {getAllUsers.isLoading ? "Loading...." : getTimeOfflineUser?.length}
          </h1>
          <h3 className="text-[1rem] text-primary font-semibold">
            TOTAL OFFLINE USERS
          </h3>
        </div>
        <div className="rounded-md py-2 px-5 border-zinc-300 border-[1px] h-[100px] flex space-x-2 flex-col items-center space-y-1">
          <h1 className="font-bold text-3xl text-[#374B65]">
            {" "}
            {getAllUsers.isLoading ? "Loading...." : getNonTrashUser?.length}
          </h1>
          <h3 className="text-[1rem] text-primary font-semibold">
            TOTAL USERS
          </h3>
        </div>
        <div className="rounded-md py-2 px-5 border-zinc-300 border-[1px] h-[100px] flex space-x-2 flex-col items-center space-y-1">
          <h1 className="font-bold text-3xl text-[#374B65]">{trashes}</h1>
          <h3 className="text-[1rem] text-primary font-semibold">
            TOTAL TRASH
          </h3>
        </div>
      </header>
      <div className="flex-grow px-3 space-y-2 flex flex-col overflow-y-auto">
        <div className="w-full flex justify-between items-center p-1.5">
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
              placeholder="Search user"
              className="py-2 px-1 outline-none text-primary flex-grow"
            />
          </div>
          <div className="space-x-1 flex items-center">
            <select
              onChange={handleSortBy}
              className="border-[1px] border-primary text-secondary px-3 py-1 cursor-pointer outline-none"
            >
              <option value="" hidden>
                Sort By
              </option>
              <option value={"a-z"}>Name A-Z</option>
              <option value={"z-a"}>Name Z-A</option>
            </select>
          </div>
        </div>
        <div className="pt-1 flex w-full justify-end items-end space-x-2">
          <button
            onClick={() => checkStatus("All")}
            className={`${
              status === "All"
                ? "bg-primary/90 text-white"
                : "bg-slate-300 text-secondary"
            } rounded-md  py-2 px-2.5`}
          >
            All
          </button>
          <button
            onClick={() => checkStatus("Online")}
            className={`${
              status === "Online"
                ? "bg-primary/90 text-white"
                : "bg-slate-300 text-secondary"
            } rounded-md  py-2 px-2.5`}
          >
            Online
          </button>
          <button
            onClick={() => checkStatus("Offline")}
            className={`${
              status === "Offline"
                ? "bg-primary/90 text-white"
                : "bg-slate-300 text-secondary"
            } rounded-md  py-2 px-2.5`}
          >
            Offline
          </button>
        </div>
        <div>
          {!sessionData?.length && !searchName.trim() ? (
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
                {searchFilterName?.map((user: SessionData, index: number) => (
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
                            `/session-log/full-details/${user.user_id}`
                          )
                        }
                        className="px-2.5 py-2 bg-primary text-white rounded-md"
                      >
                        Full Details
                      </button>

                      <button
                        onClick={() => deleteUser.mutate(user.user_id)}
                        className="px-2.5 py-2 bg-primary text-white rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}

export default SessionLog;
