"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
interface Params {
  params: {
    sessionId: string;
  };
}

function FullDetails({ params }: Params) {
  const router = useRouter();
  const getUserDetails = useQuery({
    queryKey: ["session-user", params.sessionId],
    queryFn: async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/get_session_log_details/${params.sessionId}`
      );
      return response.data.message;
    },
  });

  const date = new Date(getUserDetails.data?.user[0].date_created).getTime();
  const dateFormatted = new Date(date).toDateString();
  if (getUserDetails.isLoading) {
    return <h1>Loading..</h1>;
  }
  return (
    <div className="bg-primary w-full h-full flex justify-center items-center">
      <div className="flex flex-col bg-white rounded-md w-full md:w-[75%] py-3 px-2">
        <div className=" flex flex-col space-y-1">
          <h3 className="font-bold text-md text-secondary">
            FULL DETAILS OF{" "}
            <span className="text-primary">{`${getUserDetails.data?.user[0].first_name} ${getUserDetails.data?.user[0].middle_name} ${getUserDetails.data?.user[0].last_name}`}</span>
          </h3>
        </div>
        <h6 className="font-extrabold text-secondary text-[0.85rem] pt-2">
          USER INFORMATION
        </h6>
        <div className="grid grid-cols-1 md:grid-cols-4 pt-1 gap-2">
          <div>
            <h6 className="font-semibold text-primary text-[0.8rem]">
              User ID
            </h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
              <span>{getUserDetails.data?.user[0].user_id}</span>
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
              <span>{getUserDetails.data?.user[0].last_name}</span>
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
                  {getUserDetails.data?.user[0].middle_name
                    ? getUserDetails.data?.user[0].middle_name
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
              <span>{getUserDetails.data?.user[0].first_name}</span>
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-primary text-[0.8rem]">Age</h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
              <span>
                {" "}
                <span>{getUserDetails.data?.user[0].age}</span>
              </span>
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-primary text-[0.8rem]">Gender</h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
              <span>
                {" "}
                <span>{getUserDetails.data?.user[0].gender}</span>
              </span>
            </div>
          </div>
          <div>
            <h6 className="font-semibold text-primary text-[0.8rem]">Role</h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
              <span>
                {" "}
                <span>{getUserDetails.data?.user[0].role}</span>
              </span>
            </div>
          </div>
          <div className="md:col-span-4">
            <h6 className="font-semibold text-primary text-[0.8rem]">Reason</h6>
            <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] h-[100px] text-sm text-white">
              <span>
                {" "}
                <span>{getUserDetails.data?.user[0].reason}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <h6 className="font-extrabold text-secondary text-[0.85rem] pt-2">
            USER ACTIVITY
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-3 pt-1 gap-2">
            <div>
              <h6 className="font-semibold text-primary text-[0.8rem]">
                Status
              </h6>
              <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
                <span>
                  {" "}
                  <span>
                    {getUserDetails.data?.user[0].time_out
                      ? "Offline"
                      : "Online"}
                  </span>
                </span>
              </div>
            </div>
            <div>
              <h6 className="font-semibold text-primary text-[0.8rem]">
                Total Visit
              </h6>
              <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
                <span>
                  {" "}
                  <span>{getUserDetails.data?.session_log[0].total_visit}</span>
                </span>
              </div>
            </div>
            <div>
              <h6 className="font-semibold text-primary text-[0.8rem]">
                Total Time Consumed
                <small className="font-semibold italic text-[0.6rem]">
                  (minute)
                </small>
              </h6>
              <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
                <span>
                  {" "}
                  <span>
                    {getUserDetails.data?.user[0].time_out
                      ? getUserDetails.data.session_log[0].total_time_consumed
                      : "-----"}
                  </span>
                </span>
              </div>
            </div>
            <div>
              <h6 className="font-semibold text-primary text-[0.8rem]">
                Time In
              </h6>
              <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
                <span>
                  {" "}
                  <span>
                    {new Date(
                      getUserDetails.data.user[0].time_in
                    ).toLocaleString()}
                  </span>
                </span>
              </div>
            </div>
            <div>
              <h6 className="font-semibold text-primary text-[0.8rem]">
                Time Out
              </h6>
              <div className="w-full py-2.5 px-2 bg-primary rounded-md outline-[1px] text-sm text-white">
                <span>
                  {" "}
                  <span>
                    {getUserDetails.data?.user[0].time_out
                      ? new Date(
                          getUserDetails.data.user[0].time_out
                        ).toLocaleString()
                      : "-----"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center pt-3">
          <button
            onClick={() => router.push("/session-log")}
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
