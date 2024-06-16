"use client";
import Image from "next/image";
import attendanceImg from "../components/images/attendance-img.png";
import { SiClockify } from "react-icons/si";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
export default function Home() {
  const router = useRouter();
  return (
    <main className="w-full h-full bg-white grid grid-cols-1 md:grid-cols-2 p-2 justify-center items-center">
      <div className="flex flex-col space-y-2 justify-center items-center w-full">
        <div className="flex item-center space-x-1 px-2 ">
          <span className="text-primary text-[3rem] flex justify-center items-center">
            <SiClockify />
          </span>
          <h4 className="text-[#293133] font-bold justify-center flex items-center text-[2.5rem]">
            AttendanceHub
          </h4>
        </div>
        <p>A Web-based attendance app</p>
        <button
          onClick={() => router.push("/login")}
          className="rounded-sm bg-primary flex space-x-2 items-center px-3.5 py-2 text-white w-1/2 justify-center"
        >
          <span className="font-bold text-md">
            <FaPlus />
          </span>
          <h2> ADD NEW</h2>
        </button>
      </div>
      <div>
        <Image src={attendanceImg} alt="attendance-img" width={400} priority />
      </div>
    </main>
  );
}
