"use client";
import React from "react";
import Image from "next/image";
import loading from "../components/images/loading-animation.gif";
function Loading() {
  return (
    <div className="text-white flex items-center justify-center w-full h-screen">
      <Image src={loading} alt="loading-animation" width={300} priority />
    </div>
  );
}

export default Loading;
