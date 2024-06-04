"use client";
import Image from "next/image";
import { SiClockify } from "react-icons/si";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import sidebarBg from "../components/images/attendance-bg.png";
function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className=" absolute left-0 top-0 bottom-0 md:relative w-[300px] py-5 border-r-[1px] border-slate-300 z-20 bg-white h-full">
      <Image
        src={sidebarBg}
        alt="sidebar-bg"
        priority
        width={300}
        className="absolute bottom-0 right-0 left-0"
      />
      <div className="flex item-center space-x-1 px-2">
        <span className="text-primary text-3xl">
          <SiClockify />
        </span>
        <h4 className="text-[#293133] font-bold justify-center flex items-center">
          AttendanceHub
        </h4>
      </div>
      <div className="pt-4 pr-1">
        <small className="font-bold text-primary text-[0.7rem] px-2">
          MAIN MENU
        </small>
        <nav className="flex flex-col items-center">
          <button
            onClick={() => router.push("/")}
            className={`p-3 flex space-x-2 items-center rounded-r-3xl  ${
              pathname === "/" && "text-white bg-primary"
            } w-full text-[0.9rem]`}
          >
            HOME
          </button>
          <button
            onClick={() => router.push("/attendance")}
            className={`p-3 flex space-x-2 items-center rounded-r-3xl  ${
              pathname === "/attendance" && "text-white bg-primary"
            } w-full text-[0.9rem]`}
          >
            ATTENDANCE
          </button>
          <button
            onClick={() => router.push("/records")}
            className={`p-3 flex space-x-2 items-center rounded-r-3xl  ${
              pathname === "/records" && "text-white bg-primary"
            } w-full text-[0.9rem]`}
          >
            RECORDS
          </button>
          <button
            className={`p-3 flex space-x-2 items-center rounded-r-3xl  ${
              pathname === "/about" && "text-white bg-primary"
            } w-full text-[0.9rem]`}
          >
            ABOUT
          </button>
        </nav>
      </div>
    </div>
  );
}
export default Sidebar;
