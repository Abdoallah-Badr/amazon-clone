import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import FormattedPrice from "@/components/FormattedPrice";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi2";
import { VscChromeClose } from "react-icons/vsc";
import {
  inCreaseQuantity,
  deCreaseQuantity,
  removeCartProduct,
  addToCartAction,
} from "@/store/itemsSlice";

function ProductCard({
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
  type,
}) {
  const dispatch = useDispatch();
  return (
    <div key={_id} className="flex p-4 mb-4 bg-gray-100 max-md:flex-wrap rounded-xl">
      <span className="mr-2 shrink-0 max-md:basis-full ">
        <Image
          className="max-md:mx-auto"
          src={image}
          alt={title + " image"}
          width={150}
          height={150}
        />
      </span>
      <div className="relative flex gap-4 ">
        <div>
          <h3 className="text-xl font-semibold ">{title}</h3>
          <p className="my-1 text-sm text-gray-600">{description}</p>
          <p>
            unit price :{" "}
            {
              <span className="font-semibold">
                <FormattedPrice amount={price} />
              </span>
            }
          </p>
          {(type === "CART" && (
            <div className="flex gap-5 mt-4 item-center">
              <div className="bottom-0 flex items-center justify-between w-32 h-6 gap-2 p-4 border border-gray-300 rounded-full shadow-lg">
                <span
                  onClick={() => dispatch(inCreaseQuantity({ _id }))}
                  className="rounded-full p-[6px] hover:bg-gray-200 hover:cursor-pointer duration-300 drop-shadow-none"
                >
                  <HiOutlinePlus />
                </span>
                <p>{quantity}</p>
                <span
                  onClick={() => dispatch(deCreaseQuantity({ _id }))}
                  className="p-1 text-xl duration-300 rounded-full hover:bg-gray-200 hover:cursor-pointer drop-shadow-none"
                >
                  <HiOutlineMinus />
                </span>
              </div>
              <p
                onClick={() => dispatch(removeCartProduct({ _id }))}
                className="flex items-center justify-center gap-[2px] text-sm text-center text-gray-400 duration-300 hover:text-red-700 hover:cursor-pointer"
              >
                <VscChromeClose /> remove
              </p>
            </div>
          )) || (
            <div className="mt-4">
              <button
                onClick={() =>
                  dispatch(
                    addToCartAction({
                      _id,
                      title,
                      description,
                      oldPrice,
                      price,
                      brand,
                      image,
                      isNew,
                      category,
                      quantity: 1,
                    })
                  )
                }
                className="px-5 py-3 mt-1 text-sm font-semibold text-white duration-300 bg-black rounded-md hover:bg-amazon_yellow hover:text-black"
              >
                add to cart
              </button>
            </div>
          )}
        </div>
        <span className="mt-3 font-bold ">
          {<FormattedPrice amount={price * quantity} />}
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
