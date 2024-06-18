"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Params {
  params: {
    userId: string;
  };
}
function FullDetails({ params }: Params) {
  const router = useRouter();
  const getUserDetails = useQuery({
    queryKey: ["user", params.userId],
    queryFn: async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/get_user_details/${params.userId}`
      );
      return response.data.message[0];
    },
  });
  if (getUserDetails.isLoading) {
    return <h1>...Loading</h1>;
  }
  if (getUserDetails.isError) {
    console.log(getUserDetails.error);
  }
  console.log(getUserDetails);
  const date = new Date(getUserDetails.data.date_created).getTime();
  const dateFormatted = new Date(date).toDateString();
  return (
    <div className="bg-primary w-full h-full flex justify-center items-center">
      <div className="flex flex-col bg-white rounded-md w-full md:w-1/2 py-3 px-2">
        <div className=" flex flex-col space-y-1">
          <h3 className="font-bold text-md text-secondary">
            FULL DETAILS OF{" "}
            <span className="text-primary">{`${getUserDetails.data.first_name} ${getUserDetails.data.middle_name} ${getUserDetails.data.last_name}`}</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 pt-4 gap-2">
          <div>
            <h6 className="font-semibold text-primary text-[0.8rem]">
              User ID
            </h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
              <span>{getUserDetails.data.user_id}</span>
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-primary text-[0.8rem]">
              Account Created At
            </h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
              <span>{dateFormatted}</span>
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-primary text-[0.8rem]">
              Last Name
            </h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
              <span>{getUserDetails.data.last_name}</span>
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-primary text-[0.8rem]">
              Middle Name
            </h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
              <span>
                {" "}
                <span>
                  {getUserDetails.data.middle_name
                    ? getUserDetails.data.middle_name
                    : "N/A"}
                </span>
              </span>
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-primary text-[0.8rem]">
              First Name
            </h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
              <span>{getUserDetails.data.first_name}</span>
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-primary text-[0.8rem]">Age</h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
              <span>
                {" "}
                <span>{getUserDetails.data.age}</span>
              </span>
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-primary text-[0.8rem]">Gender</h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
              <span>
                {" "}
                <span>{getUserDetails.data.gender}</span>
              </span>
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-primary text-[0.8rem]">Role</h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
              <span>
                {" "}
                <span>{getUserDetails.data.role}</span>
              </span>
            </div>
          </div>
          <div className="md:col-span-2">
            <h6 className="font-semibold text-primary text-[0.8rem]">Reason</h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] h-[100px] text-sm text-white">
              <span>
                {" "}
                <span>{getUserDetails.data.reason}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center pt-3">
          <button
            onClick={() => router.push("/attendance")}
            className="bg-transparent border-[1px] border-primary rounded-md py-2.5 px-2 text-primary w-1/2"
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}

export default FullDetails;
