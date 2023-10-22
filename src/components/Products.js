import React from "react";
import Image from "next/image";

import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import FormattedPrice from "./FormattedPrice";

function Products({ productsList }) {
  return (
    <>
      {productsList.map(
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
        }) => {
          return (
            <div
              key={_id}
              className="relative z-50 w-full p-4 overflow-hidden text-black bg-white border-gray-300 rounded-lg group"
            >
              <div className="w-full h-[260px] border-b-gray-300 border-b">
                <Image
                  className="object-cover w-full h-full transition-transform duration-300 scale-90 group-hover:scale-100"
                  width={300}
                  height={300}
                  src={image}
                  alt={title}
                />
              </div>
              <div className="absolute right-0 flex flex-col items-center h-24 text-lg transition-transform duration-300 translate-x-20 bg-transparent border border-gray-400 rounded-md cursor-pointer w-11 bottom-1/3 group-hover:translate-x-[-16px] bg-white">
                <span className="flex items-center justify-center w-full h-12 duration-200 border-b border-gray-400 hover:bg-amazon_yellow">
                  <FaShoppingCart />
                </span>
                <span className="flex items-center justify-center w-full h-12 duration-200 hover:bg-amazon_yellow">
                  <FaHeart />
                </span>
              </div>
              {isNew && (
                <p className="absolute text-sm tracking-wide right-2 top-3 group-hover:animate-bounce group-hover:text-amazon_yellow ">
                  !save {<FormattedPrice amount={oldPrice - price} />}
                </p>
              )}
              <div className="flex flex-col gap-1 p-4">
                <p className="text-xs text-gray-400">{category}</p>
                <p className="text-base font-medium">{title}</p>
                <p className="w-1/2">
                  <span className="mr-2 text-sm line-through opacity-80">
                    <FormattedPrice amount={oldPrice} />
                  </span>
                  <span className="font-semibold text-amazon_blue ">
                    <FormattedPrice amount={price} />
                  </span>
                </p>
                <p className="my-2 text-xs ">{`${description}`.substring(0, 120)}</p>
                <button className="py-3 mt-1 text-sm font-medium text-white duration-300 bg-black rounded-md hover:bg-amazon_yellow hover:text-black" >add to cart </button>
              </div>
              
            </div>
          );
        }
      )}
    </>
  );
}

export default Products;
