import React from "react";
import { FaUsers } from "react-icons/fa";
function Attendance() {
  return (
    <div className="w-full h-full">
      <div className="grid space-x-2 md:grid-cols-3 grid-cols-2 p-2">
        <div className="rounded-md py-2 px-5 border-primary border-[1px] h-[120px] flex items-center space-x-2 justify-evenly">
          <span className="text-[6rem] text-primary">
            <FaUsers />
          </span>
          <h1 className="font-bold text-3xl">5</h1>
        </div>
        <div className="rounded-md p-2 border-primary border-[1px] h-[120px]">
          d
        </div>
        <div className="rounded-md p-2 border-primary border-[1px] h-[120px]">
          d
        </div>
      </div>
    </div>
  );
}

export default Attendance;
