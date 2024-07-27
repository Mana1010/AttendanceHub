import React, { ReactNode } from "react";

interface LayoutSchema {
  children: ReactNode;
  modal: ReactNode;
}
function AttendanceLayout({ children, modal }: LayoutSchema) {
  return (
    <div className="w-full h-full">
      {children}
      {modal}
    </div>
  );
}

export default AttendanceLayout;
