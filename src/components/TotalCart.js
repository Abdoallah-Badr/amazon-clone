import { GiDandelionFlower } from "react-icons/gi";
import FormattedPrice from "./FormattedPrice";
import { setTotalPrice } from "@/store/itemsSlice";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";

function TotalCart() {
  const dispatch = useDispatch()
  
  const userInfo = useSelector((state) => state.items.userInfo);
  const totalCartPrice = useSelector((state) => state.items.totalCartPrice);
  const allCartProducts = useSelector((state) => state.items.allCartProducts);
  
  useEffect(()=>{
    dispatch(setTotalPrice())
  },[allCartProducts,dispatch])
  console.log(totalCartPrice);
  return (
    <div className="flex flex-col items-start justify-center w-2/6 gap-4 p-3 mt-2 rounded-lg bg-slate-50 h-max">
      <div className="flex gap-1 ">
        <span className="flex items-center justify-center w-6 h-6 p-1 mt-1 text-white bg-green-600 rounded-full">
          <GiDandelionFlower className="text-md" />
        </span>
        <p className="text-sm">
          Your order qualifies for FREE Shipping by Choosing this option at
          checkout. See details....
        </p>
      </div>
      <span className="flex mx-2 text-lg font-semibold text-center ">
        <p>Total:</p>
        <FormattedPrice amount={totalCartPrice} />
      </span>
      <button
        className={`w-full py-2 font-medium text-white bg-gray-500 rounded-md text-md ${
          !userInfo ? "hover:cursor-not-allowed" : ""
        }`}
      >
        Proceed to Pay
      </button>
      {!userInfo && (
        <p className="mx-auto text-xs font-medium text-center text-red-500 animate-bounce">
          Please login to continue
        </p>
      )}
    </div>
  );
}

export default TotalCart;
