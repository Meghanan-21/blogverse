import { assets } from "@/Assets/Assets/assets";
import SideBar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <ToastContainer theme="dark" />
        <SideBar />
        {/* To add other papers as per the options(add blog) clicked */}
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
            <h3 className="font-medium">Admin Panel</h3>
            <Image
              src={assets.profile_icon}
              width={40}
              alt="profile_icon"
              className="rounded-full"
            />
          </div>
          {children}
        </div>
      </div>
      {/* {children} this small change would make it appear right side below the navigation bar */}
    </>
  );
}
