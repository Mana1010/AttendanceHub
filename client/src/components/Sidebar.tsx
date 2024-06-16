"use client";
import { SiClockify } from "react-icons/si";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="absolute left-0 top-0 bottom-0 md:relative w-[300px] py-5 border-r-[1px] border-slate-300 z-20 bg-white h-full">
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
              pathname.startsWith("/attendance") && "text-white bg-primary"
            } w-full text-[0.9rem]`}
          >
            ATTENDANCE
          </button>
          <button
            onClick={() => router.push("/session-log")}
            className={`p-3 flex space-x-2 items-center rounded-r-3xl  ${
              pathname === "/session-log" && "text-white bg-primary"
            } w-full text-[0.9rem]`}
          >
            SESSION LOG
          </button>
          <button
            onClick={() => router.push("/trash")}
            className={`p-3 flex space-x-2 items-center rounded-r-3xl  ${
              pathname === "/trash" && "text-white bg-primary"
            } w-full text-[0.9rem]`}
          >
            TRASH
          </button>
        </nav>
      </div>
      <small className="font-bold text-primary text-[0.7rem] px-2">
        AUTHENTICATION
      </small>
      <nav className="flex flex-col items-center">
        <button
          onClick={() => router.push("/login")}
          className={`p-3 flex space-x-2 items-center rounded-r-3xl  ${
            pathname === "/login" && "text-white bg-primary"
          } w-full text-[0.9rem]`}
        >
          LOGIN
        </button>
        <button
          onClick={() => router.push("/register")}
          className={`p-3 flex space-x-2 items-center rounded-r-3xl  ${
            pathname === "/register" && "text-white bg-primary"
          } w-full text-[0.9rem]`}
        >
          REGISTER
        </button>
      </nav>
    </div>
  );
}
export default Sidebar;
