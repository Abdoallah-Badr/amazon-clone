import { GiDandelionFlower } from "react-icons/gi";
import FormattedPrice from "./FormattedPrice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
function TotalCart() {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const cartProducts = useSelector((state) => state.items.cartProducts);

  useEffect(() => {
    setTotalPrice(0);
    cartProducts.forEach(({ quantity, price }) => {
      const totalForItem = quantity * price;
      setTotalPrice((state) => state + totalForItem);
    });
  }, [cartProducts, dispatch]);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const { data: session } = useSession();

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartProducts,
        email: session?.user?.email,
      }),
    });
    const checkoutSession = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

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
        <FormattedPrice amount={totalPrice} />
      </span>
      <button
        onClick={handleCheckout}
        className={`w-full py-2 font-medium text-white  rounded-md text-md bg-black hover:bg-amazon_yellow hover:text-black duration-300 ${
          !userInfo ? "hover:cursor-not-allowed bg-gray-500" : ""
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
