import Banner from "@/components/Banner";
import Products from "@/components/Products";
export default function Home({ products }) {
  return (
    <main>
      <div className="mx-auto max-w-screen-2xl">
        <Banner />
        <div className="relative grid gap-5 p-5 pb-10 bg-gray-300 md:-mt-20 lgl:-mt-32 xl:-mt-60 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1">
          <Products productsList={products} />
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://fakestoreapiserver.reactbd.com/tech");
  const products = await res.json();
  return {
    props: { products },
  };
}
