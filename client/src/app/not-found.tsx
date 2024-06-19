"use client";
import React from "react";
import notFound from "../components/images/not-found.png";
import Image from "next/image";
import Link from "next/link";
function NotFound() {
  return (
    <div className="flex items-center flex-col space-y-2 justify-center w-full h-full bg-white">
      <Image src={notFound} alt="not-found" width={400} priority />
      <Link
        href={"/"}
        className="text-white text-lg py-2.5 px-5 rounded-md bg-primary"
      >
        Go Back
      </Link>
    </div>
  );
}

export default NotFound;
