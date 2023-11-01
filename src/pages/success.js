import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "@/store/itemsSlice";
function SuccessPage() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20 bg-gray-200">
      <h2 className="text-xl font-semibold ">Thank you for shopping  </h2>
      <Link href={"/"} onClick={() => dispatch(resetCart())}>
        <p> continue shopping </p>
      </Link>
    </div>
  );
}

export default SuccessPage;
