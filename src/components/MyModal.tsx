import React, { ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";

function MyModal({
  children,
  active,
  setActive,
  heading,
}: {
  children: ReactNode;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string;
}) {
  return active ? (
    <div
      className="fixed z-50 left-0 top-0 w-full h-full flex items-center justify-center "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      onClick={() => setActive(false)}
    >
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
        className="w-full max-w-[600px] min-h-[300px]  bg-white rounded-xl"
      >
        <nav className="w-full flex border-b-2 border-gray-200 justify-between px-3 py-1  text-black text-[20px]">
          <div></div>
          <p className="text-[17px] font-bold">{heading}</p>
          <button onClick={() => setActive(false)}>
            <RxCross2 />
          </button>
        </nav>
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  ) : null;
}

export default MyModal;
