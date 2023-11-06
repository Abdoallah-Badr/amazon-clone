import Image from "next/image";
import logo from "../../images/logo.png";
import cartIcon from "../../images/cartIcon.png";

import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { addUserInfo } from "@/store/itemsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSession, signIn } from "next-auth/react";
import FormattedPrice from "../FormattedPrice";

function Header() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [showSearched, setShowSearched] = useState(false);
  const [foucsOnSearch, setFoucsOnSearch] = useState(false);
  const { allCartProducts, favoriteProducts, allProducts } =
    useSelector((state) => state.items);
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    if (query) {
      const filtered = allProducts.filter((product) =>
        product.title.toLocaleLowerCase().includes(query.toLowerCase())
      );

      setFilteredItems(filtered);
    }
  }, [query, allProducts]);
  useEffect(() => {
    if (session?.user?.name) {
      dispatch(
        addUserInfo({
          name: session?.user?.name,
          image: session?.user?.image,
          email: session?.user?.email,
        })
      );
    }
  }, [session, dispatch]);

  useEffect(() => {
    if (query.length >= 1 && foucsOnSearch) {
      setShowSearched(true);
    } else if (query.length === 0) {
      setShowSearched(false);
    }
  }, [query, foucsOnSearch]);

  return (
    <div className="sticky top-0 z-50 w-full h-20 bg-amazon_blue text-lightText">
      <div className="inline-flex items-center justify-between w-full h-full gap-1 px-4 mx-auto-flex mdl:gap-3">
        <Link
          href={"/"}
          className="p-2 duration-300 border border-transparent hover:border-cyan-50 hover:cursor-pointer"
        >
          <Image
            className="object-cover mt-1 w-28"
            src={logo}
            alt="amazon logo"
          />
        </Link>
        {/* delivery */}
        <div className=" h-[70%] items-center hidden p-2 duration-300 border border-transparent xl:inline-flex hover:border-cyan-50 hover:cursor-pointer">
          <SlLocationPin className="mr-1" />
          <div className="text-xs ">
            <p>Deliver to</p>
            <p className="text-center text-white uppercase bold">Egypt</p>
          </div>
        </div>
        {/* search bar */}
        <div
          onBlur={() => {
            setShowSearched(false);
          }}
          onFocus={() => {
            setFoucsOnSearch(true);
          }}
          className="relative items-center justify-between flex-1 hidden h-10 rounded-md md:inline-flex "
        >
          <input
            type="text"
            placeholder="search amazon clone project"
            className="flex-1 w-full h-full px-2 text-base text-black border-transparent rounded-md outline-none placeholder:text-sm focus:border-none indent-1 hover:ring-2 hover:ring-amazon_green"
            onChange={handleSearch}
          />

          {showSearched ? (
            <div className="absolute flex-col w-full gap-3 overflow-scroll overflow-x-hidden text-black rounded bg-slate-100 top-11 h-80">
              {filteredItems.map((item) => (
                <Link
                  href={{
                    pathname: `/${item._id}`,
                    query: {
                      _id: item._id,
                      title: item.title,
                      description: item.description,
                      oldPrice: item.oldPrice,
                      price: item.price,
                      brand: item.brand,
                      image: item.image,
                      isNew: item.isNew,
                      category: item.category,
                    },
                  }}
                  key={item._id}
                >
                  <div className="flex items-center justify-start gap-2">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={100}
                    />
                    <div className="flex-col justify-center">
                      <p className="text-sm font-medium">{item.brand}</p>
                      <p className="text-lg font-bold">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        {`${item.description}`.substring(0, 100)}
                      </p>
                      <span className="text-sm text-gray-500">
                        {"price : "}
                        <FormattedPrice amount={item.price} />
                        <span className="ml-1 line-through">
                          <FormattedPrice amount={item.oldPrice} />
                        </span>
                      </span>
                    </div>
                    <div className="ml-16 font-semibold">
                      <FormattedPrice amount={item.oldPrice - item.price} />
                    </div>
                  </div>
                  <hr />
                </Link>
              ))}
            </div>
          ) : (
            <>{""}</>
          )}
          <span className="absolute right-0 flex items-center justify-center w-12 h-full text-2xl text-center text-black bg-amazon_green hover:cursor-pointer rounded-r-md">
            <HiOutlineSearch />
          </span>
        </div>
        {/* signIn */}

        {(!session && (
          <div
            onClick={() => signIn()}
            className="flex h-[70%] flex-col justify-center p-2 text-xs duration-300 border border-transparent hover:border-cyan-50 hover:cursor-pointer"
          >
            <p>Hello, sign in</p>
            <p className="flex items-center font-bold text-white">
              Account & Lists
              <BiCaretDown />
            </p>
          </div>
        )) || (
          <div className="flex items-center justify-center">
            <Image
              className="mr-1 rounded-full"
              width={32}
              height={32}
              src={session?.user?.image}
              alt={"user image"}
            />
            <span>
              <p className="text-xs font-bold"> {session?.user?.name} </p>
              <p className="text-xs ">{session?.user?.email}</p>
            </span>
          </div>
        )}
        {/* favorite */}
        <Link href={"/favorite"}>
          <div className="p-2 flex h-[70%] flex-col justify-center text-xs duration-300 border border-transparent  hover:border-cyan-50 hover:cursor-pointer relative">
            {favoriteProducts.length ? (
              <p className="absolute top-2 right-1 px-[3px] border border-gray-100 text-amazon_green text-center">
                {favoriteProducts.length}
              </p>
            ) : null}
            <p>Marked</p>
            <p className="font-bold text-white">& favorite</p>
          </div>
        </Link>
        {/* cart */}
        <Link
          href={"/cart"}
          className="relative flex items-end p-2 text-xs duration-300 border border-transparent text-end hover:border-cyan-50 hover:cursor-pointer h-[70%] font-semibold"
        >
          <Image
            className="object-cover w-auto h-8"
            src={cartIcon}
            alt="cart icon"
          />
          <p className="font-bold text-white ">Cart</p>
          <p className="absolute top-2 text-sm left-[29px] text-amazon_green ">
            {allCartProducts ? allCartProducts : 0}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
