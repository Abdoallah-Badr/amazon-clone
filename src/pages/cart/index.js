import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import FormattedPrice from "@/components/FormattedPrice";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi2";
import { VscChromeClose } from "react-icons/vsc";
import {
  inCreaseQuantity,
  deCreaseQuantity,
  removeCartProduct,
} from "@/store/itemsSlice";

function Cart() {
  const cartProducts = useSelector((state) => state.items.cartProducts);
  const dispatch = useDispatch();
  return (
    <div className="p-3 bg-gray-300 h-max">
      <div className="m-2 rounded-lg bg-slate-50 h-max">
        {!cartProducts.length ? (
          <div className="flex flex-col h-[50vh] justify-center items-center ">
            <p>your cart is empty !</p>
            <Link href={"/"}>
              <p className="py-3 mt-3 text-sm font-semibold text-white duration-300 bg-black rounded-lg px-14 hover:bg-amazon_yellow hover:text-black">
                go to shopping !
              </p>
            </Link>
          </div>
        ) : (
          <div className="p-4 ">
            <span className=" flex items-center justify-between pb-2 font-semibold border-b-[1px] border-gray-600">
              <h2 className="text-2xl ">Shopping Cart</h2>
              <p className="text-[18px] ">Subtotal</p>
            </span>
            <div className="mt-4">
              {cartProducts.map(
                ({
                  _id,
                  title,
                  description,
                  oldPrice,
                  price,
                  brand,
                  image,
                  isNew,
                  category,
                  quantity,
                }) => {
                  return (
                    <div
                      key={_id}
                      className="flex p-4 mb-4 bg-gray-100 rounded-xl"
                    >
                      <span className="shrink-0 ">
                        <Image
                          src={image}
                          alt={title + " image"}
                          width={150}
                          height={150}
                        />
                      </span>
                      <div className="relative flex gap-4 ">
                        <div className="">
                          <h3 className="text-xl font-semibold ">{title}</h3>
                          <p className="my-1 text-sm text-gray-600">
                            {description}
                          </p>
                          <p>
                            unit price :{" "}
                            {
                              <span className="font-semibold">
                                <FormattedPrice amount={price} />
                              </span>
                            }
                          </p>
                          <div className="flex gap-5 mt-4 item-center">
                            <div className="bottom-0 flex items-center justify-between w-32 h-6 gap-2 p-4 border border-gray-300 rounded-full shadow-lg">
                              <span
                                onClick={() =>
                                  dispatch(inCreaseQuantity({ _id }))
                                }
                                className="rounded-full p-[6px] hover:bg-gray-200 hover:cursor-pointer duration-300 drop-shadow-none"
                              >
                                <HiOutlinePlus />
                              </span>
                              <p className="">{quantity}</p>
                              <span
                                onClick={() =>
                                  dispatch(deCreaseQuantity({ _id }))
                                }
                                className="p-1 text-xl duration-300 rounded-full hover:bg-gray-200 hover:cursor-pointer drop-shadow-none"
                              >
                                <HiOutlineMinus />
                              </span>
                            </div>
                            <p
                              onClick={() =>
                                dispatch(removeCartProduct({ _id }))
                              }
                              className="flex items-center justify-center gap-[2px] text-sm text-center text-gray-400 duration-300 hover:text-red-700 hover:cursor-pointer"
                            >
                              <VscChromeClose /> remove
                            </p>
                          </div>
                        </div>
                        <span className="mt-3 font-bold ">
                          {<FormattedPrice amount={price * quantity} />}
                        </span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
