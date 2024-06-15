"use client";
import React from "react";
import Image from "next/image";
import emptyUser from "./images/no-active-user.png";
function EmptyUser() {
  return (
    <div className="flex items-center justify-center space-y-2 w-full flex-col min-h-[350px]">
      <Image src={emptyUser} alt="no-active-user" width={250} priority />
      <h3 className="text-secondary text-2xl font-bold">NO ACTIVE USER</h3>
    </div>
  );
}

export default EmptyUser;
