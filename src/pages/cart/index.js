import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "@/components/ProductCard";
import { resetCart } from "@/store/itemsSlice";
import TotalCart from "@/components/TotalCart";
import Head from "next/head";
function CartPage() {
  const cartProducts = useSelector((state) => state.items.cartProducts);
  const dispatch = useDispatch();
  return (
    <>
      <Head>
        <title>Store Cart</title>
      </Head>
      <div
        className={`p-3 px-4 bg-gray-300 h-max ${
          cartProducts.length ? " xl:flex gap-5" : ""
        }`}
      >
        <div className="flex-auto max-w-screen-xl m-2 mx-auto rounded-lg bg-slate-50 h-max">
          {!cartProducts.length ? (
            <div className="flex flex-col h-[50vh] justify-center items-center ">
              <p>your cart is empty !</p>
              <Link href={"/"}>
                <p className="py-3 mt-3 text-sm font-semibold text-white duration-300 bg-black rounded-lg px-14 hover:bg-amazon_green hover:text-black">
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
                      <ProductCard
                        key={_id}
                        _id={_id}
                        title={title}
                        description={description}
                        oldPrice={oldPrice}
                        price={price}
                        brand={brand}
                        image={image}
                        isNew={isNew}
                        category={category}
                        quantity={quantity}
                        type="CART"
                      />
                    );
                  }
                )}
              </div>
              <button
                onClick={() => {
                  dispatch(resetCart());
                }}
                className="px-12 py-2 font-semibold text-black duration-300 bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white"
              >
                reset cart
              </button>
            </div>
          )}
        </div>
        {cartProducts.length ? <TotalCart /> : <></>}
      </div>
    </>
  );
}

export default CartPage;
