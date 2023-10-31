import { LuMenu } from "react-icons/lu";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { removeUser } from "@/store/itemsSlice";
const BottomHeader = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center w-full h-10 gap-3 px-4 text-sm text-center text-white bg-amazon_light">
      <div className="flex items-center gap-1 p-1 duration-300 border border-transparent hover:border-gray-50 hover:cursor-pointer">
        <LuMenu className="text-xl" />
        <p>All</p>
      </div>
      <p className="hidden p-1 duration-300 border border-transparent md:inline-flex hover:border-gray-50 hover:cursor-pointer">
        Todays Deals
      </p>
      <p className="hidden p-1 duration-300 border border-transparent md:inline-flex hover:border-gray-50 hover:cursor-pointer">
        Customer Service
      </p>
      <p className="hidden p-1 duration-300 border border-transparent md:inline-flex hover:border-gray-50 hover:cursor-pointer">
        Registry
      </p>
      <p className="hidden p-1 duration-300 border border-transparent md:inline-flex hover:border-gray-50 hover:cursor-pointer">
        Gift Cards
      </p>
      <p className="hidden p-1 duration-300 border border-transparent md:inline-flex hover:border-gray-50 hover:cursor-pointer">
        Sell
      </p>
      <p
        onClick={() => {
          dispatch(removeUser());
          signOut();
        }}
        className="hidden p-1 duration-300 border border-transparent md:inline-flex hover:border-red-600 hover:cursor-pointer text-amazon_yellow hover:text-red-400"
      >
        Sign Out
      </p>
    </div>
  );
};

export default BottomHeader;
