import Image from "next/image";
import logo from "../../images/logo.png";
import cartIcon from "../../images/cartIcon.png";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";

function Header() {
  return (
    <div className="sticky top-0 z-50 w-full h-20 bg-amazon_blue text-lightText">
      <div className="inline-flex items-center justify-between w-full h-full gap-1 px-4 mx-auto-flex mdl:gap-3">
        <div className="p-2 duration-300 border border-transparent hover:border-cyan-50 hover:cursor-pointer">
          <Image
            className="object-cover mt-1 w-28"
            src={logo}
            alt="amazon logo"
          />
        </div>
        {/* delivery */}
        <div className=" h-[70%] items-center hidden p-2 duration-300 border border-transparent xl:inline-flex hover:border-cyan-50 hover:cursor-pointer">
          <SlLocationPin className="mr-1" />
          <div className="text-xs ">
            <p>Deliver to</p>
            <p className="text-center text-white uppercase bold">Egypt</p>
          </div>
        </div>
        {/* search bar */}
        <div className="relative items-center justify-between flex-1 hidden h-10 md:inline-flex">
          <input
            type="text"
            placeholder="search amazon clone project"
            className="flex-1 w-full h-full px-2 text-base text-black border-transparent outline-none border-[5px] rounded-md placeholder:text-sm focus:border-none focus-visible:border-amazon_yellow indent-1	"
          />
          <span className="absolute right-0 flex items-center justify-center w-12 h-full text-2xl text-center text-black bg-amazon_yellow hover:cursor-pointer rounded-r-md">
            <HiOutlineSearch />
          </span>
        </div>
        {/* signIn */}
        <div className="flex h-[70%] flex-col justify-center p-2 text-xs duration-300 border border-transparent hover:border-cyan-50 hover:cursor-pointer">
          <p>Hello, sign in</p>
          <p className="flex items-center font-bold text-white">
            Account & Lists
            <BiCaretDown />
          </p>
        </div>
        {/* favorite */}
        <div className="p-2 flex h-[70%] flex-col justify-center text-xs duration-300 border border-transparent  hover:border-cyan-50 hover:cursor-pointer">
          <p>Marked</p>
          <p className="font-bold text-white">& favorite</p>
        </div>
        {/* cart */}
        <div className="relative flex items-end p-2 text-xs duration-300 border border-transparent text-end hover:border-cyan-50 hover:cursor-pointer h-[70%]">
          <Image
            className="object-cover w-auto h-8"
            src={cartIcon}
            alt="cart icon"
          />
          <p className="font-bold text-white ">Cart</p>
          <p className="absolute top-0 text-lg left-[29px] text-amazon_yellow ">
            0
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
