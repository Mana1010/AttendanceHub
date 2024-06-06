"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { utilStore } from "@/store/utils.store";
function GetCode() {
  const { code, name, setCode, setName, setOpenAddUser } = utilStore();
  return (
    <div className="w-[600px] rounded-md bg-white py-2 p-2">
      <div className="pb-2 space-y-2">
        <h3 className="font-semibold text-secondary">
          Dear <span className="text-primary">{name}</span>,
        </h3>

        <p className="italic text-sm text-secondary">
          Welcome to our library! We&apos;re thrilled to have you as a new
          member.
        </p>
      </div>
      <div className="flex items-center justify-center flex-col w-full pt-3 space-y-3">
        <h5 className="text-secondary font-semibold">
          Your unique access code is:
        </h5>
        <div className="w-1/2 text-primary border-[1px] border-primary flex items-center justify-center p-4 rounded-md">
          <h1 className="text-[2rem]">{code}</h1>
        </div>
        <p className="text-secondary text-[0.8rem] text-center">
          The code above grant you access to our extensive collection and
          various features. Please keep it secure for your future visits.
        </p>
      </div>
      <p className="text-sm text-secondary pt-2">
        We encourage you to explore our resources at your leisure. Our friendly
        staff is always available to assist you with any questions or
        recommendations you may have.
      </p>
      <div className="flex justify-end flex-col w-full items-end pt-3">
        <h3 className="text-secondary text-sm">Best Regards,</h3>
        <h5 className="text-primary text-sm">The Library Team</h5>
      </div>
      <div className="w-full flex items-center justify-center mt-2">
        <button
          onClick={() => {
            setCode(null), setName(null), setOpenAddUser(false);
          }}
          className="w-full md:w-1/2 bg-primary py-2.5 px-2 text-white rounded-md mx-auto"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default GetCode;
