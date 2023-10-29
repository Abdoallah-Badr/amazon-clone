import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "@/components/ProductCard";
import { resetFavoriteList } from "@/store/itemsSlice";

function FavoritePage() {
  const favoriteList = useSelector((state) => state.items.favoriteProducts);
  const dispatch = useDispatch();
  return (
    <div className="p-3 bg-gray-300 h-max">
      <div className="max-w-screen-xl m-2 mx-auto rounded-lg bg-slate-50 h-max">
        {!favoriteList.length ? (
          <div className="flex flex-col h-[50vh] justify-center items-center ">
            <p>No favorite items you added !</p>
            <Link href={"/"}>
              <p className="py-3 mt-3 text-sm font-semibold text-white duration-300 bg-black rounded-lg px-14 hover:bg-amazon_yellow hover:text-black">
                return to products list
              </p>
            </Link>
          </div>
        ) : (
          <div className="p-4">
            <span className=" flex items-center justify-between pb-2 font-semibold border-b-[1px] border-gray-600">
              <h2 className="text-2xl ">Favorite Items</h2>
              <p className="text-[18px] ">Action</p>
            </span>
            <div className="mt-4">
              {favoriteList.map(
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
                      quantity={1}
                    />
                  );
                }
              )}
            </div>
            <button
              onClick={() => {
                dispatch(resetFavoriteList());
              }}
              className="py-2 font-semibold text-black duration-300 bg-gray-200 rounded-lg px-7 hover:bg-red-600 hover:text-white"
            >
              reset favorite list
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritePage;
