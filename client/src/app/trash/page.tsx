"use client";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import NotFound from "@/components/NotFound";
import EmptyUser from "@/components/EmptyUser";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Payload } from "../attendance/page";
import { toast } from "sonner";
import Confirmation from "@/components/Confirmation";
import Loading from "@/components/Loading";
interface Trash {
  user_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  role: string;
  reason: string;
}
function Trash() {
  const [sortBy, setSortBy] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [trashData, setTrashData] = useState<Trash[] | null | undefined>(null);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const router = useRouter();
  const getTrashes = useQuery({
    queryKey: ["trashes"],
    queryFn: async () => {
      const response = await axios.get("http://127.0.0.1:8000/get_all_trash");
      const data = response.data.message;
      setTrashData(data);
      return response.data.message;
    },
  });
  const restoreTrash = useMutation({
    mutationFn: async (user_id: number) => {
      const response = await axios.post(
        `http://127.0.0.1:8000/restore_user/${user_id}`
      );
      return response.data.message;
    },
    onSuccess: (data) => {
      toast.success(data);
      getTrashes.refetch();
    },
  });
  const deleteUserPermanently = useMutation({
    mutationFn: async (user_id: number) => {
      const response = await axios.post(
        `http://127.0.0.1:8000/delete_user_permanently/${user_id}`
      );
      return response.data.message;
    },
    onSuccess: (data) => {
      toast.success(data);
      getTrashes.refetch();
    },
  });
  if (getTrashes.isLoading) {
    return <Loading />;
  }
  const searchFilterName = trashData?.filter((user: Trash) =>
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
      const sortUserAZ = trashData?.sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );
      setTrashData(sortUserAZ);
    } else {
      const sortUserZA = trashData?.sort((b, a) =>
        a.first_name.localeCompare(b.first_name)
      );
      setTrashData(sortUserZA);
    }
  }
  return (
    <div className="w-full h-full p-2 flex flex-col">
      <header className="grid space-x-2 p-2">
        <div className="rounded-md py-2 px-5 border-zinc-300 border-[1px] h-[100px] flex space-x-2 flex-col items-center space-y-1">
          <h1 className="font-bold text-3xl text-[#374B65]">
            {trashData?.length}
          </h1>
          <h3 className="text-[1rem] text-primary font-semibold">
            TOTAL DELETED USERS
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
              placeholder="Search your trash"
              className="py-2 px-1 outline-none text-primary flex-grow"
            />
          </div>

          <div className="space-x-3 flex items-center">
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
            </select>
            <button
              onClick={() => setIsConfirm(true)}
              className="bg-primary py-1.5 px-3 text-white rounded-sm"
            >
              Delete All Trash
            </button>
          </div>
        </div>
        <div>
          {!trashData?.length && !searchName.trim() ? (
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
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {searchFilterName?.map((user: Trash, index: number) => (
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
                    <td className="text-center text-[0.8rem] px-2 w-[150px]">
                      {user.reason}
                    </td>
                    <td className="text-center text-[0.8rem] space-x-2 p-2">
                      <button
                        onClick={() => restoreTrash.mutate(user.user_id)}
                        className="px-2.5 py-2 bg-primary text-white rounded-md"
                      >
                        Restore
                      </button>
                      <button
                        disabled={trashData?.length ? false : true}
                        onClick={() =>
                          deleteUserPermanently.mutate(user.user_id)
                        }
                        className="px-2.5 py-2 bg-red-500 text-white rounded-md"
                      >
                        Delete Permanently
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {isConfirm && (
        <Confirmation data={getTrashes} setIsConfirm={setIsConfirm} />
      )}
    </div>
  );
}

export default Trash;
