import FormattedPrice from "@/components/FormattedPrice";
import { addToCartAction, addToFavoriteAction } from "@/store/itemsSlice";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setProduct(router.query);
  }, [router.query]);
  return (
    <>
      <Head>
        <title>
          {product.category}/{`${product.title}`.substring(0, 10) + ".."}
        </title>
      </Head>
      <div className="max-w-screen-xl px-4 py-4 mx-auto md:py-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center w-full gap-6 py-20">
            <p>Your product is loading...</p>
            <PulseLoader color="#131921" size={40} />
          </div>
        ) : (
          <div className="grid w-full gap-3 bg-gray-100 rounded-lg md:grid-cols-3">
            <div className="relative flex items-center justify-center overflow-hidden bg-gray-200 rounded-lg group">
              <Image
                src={product.image}
                alt="product image"
                width={500}
                height={500}
              />
              <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:-translate-x-2 transition-transform duration-300">
                <span
                  onClick={() =>
                    dispatch(
                      addToCartAction({
                        _id: product._id,
                        brand: product.brand,
                        category: product.category,
                        description: product.description,
                        image: product.image,
                        isNew: product.isNew,
                        oldPrice: product.oldPrice,
                        price: product.price,
                        title: product.title,
                        quantity: 1,
                      })
                    )
                  }
                  className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_green cursor-pointer duration-300"
                >
                  <HiShoppingCart />
                </span>
                <span
                  onClick={() =>
                    dispatch(
                      addToFavoriteAction({
                        _id: product._id,
                        brand: product.brand,
                        category: product.category,
                        description: product.description,
                        image: product.image,
                        isNew: product.isNew,
                        oldPrice: product.oldPrice,
                        price: product.price,
                        title: product.title,
                        quantity: 1,
                      })
                    )
                  }
                  className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_green cursor-pointer duration-300"
                >
                  <FaHeart />
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-3 p-4 md:col-span-2">
              <p className="-mb-3 text-xs font-semibold md:text-sm text-amazon_blue">
                {product.category}_{product.brand}
              </p>
              <h1 className="text-xl font-semibold tracking-wide md:text-3xl">
                {product.title}
              </h1>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div>
                <p className="flex items-center gap-1 text-base text-gray-600">
                  Price:
                  <span className="text-lg font-semibold text-amazon_blue">
                    <FormattedPrice amount={product.price} />
                  </span>
                  <span className="ml-1 line-through">
                    <FormattedPrice amount={product.oldPrice} />
                  </span>
                </p>
                <p className="flex items-center gap-1 text-sm text-gray-500">
                  Your saved:{" "}
                  <span>
                    <FormattedPrice amount={product.oldPrice - product.price} />
                  </span>
                </p>
                <button
                  onClick={() =>
                    dispatch(
                      addToCartAction({
                        _id: product._id,
                        brand: product.brand,
                        category: product.category,
                        description: product.description,
                        image: product.image,
                        isNew: product.isNew,
                        oldPrice: product.oldPrice,
                        price: product.price,
                        title: product.title,
                        quantity: 1,
                      })
                    )
                  }
                  className="w-full h-12 mt-5 text-base font-semibold text-gray-200 duration-300 rounded-lg md:w-96 bg-amazon_blue hover:bg-amazon_green hover:text-amazon_blue"
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
