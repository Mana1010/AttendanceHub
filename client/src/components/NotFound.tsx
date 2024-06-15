"use client";
import Image from "next/image";
import React from "react";
import userNotFound from "../components/images/user-not-found.png";
function NotFound({ search }: { search: string }) {
  return (
    <div className="flex items-center justify-center space-y-2 w-full flex-col min-h-[350px]">
      <Image src={userNotFound} alt="user-not-found" width={250} priority />
      <h3 className="text-secondary text-2xl font-bold">
        USER NAMED{" "}
        <span className="text-primary">{`${
          search.length > 20 ? `"${search.slice(0, 20)}..."` : `"${search}"`
        }`}</span>{" "}
        NOT FOUND
      </h3>
    </div>
  );
}

export default NotFound;
