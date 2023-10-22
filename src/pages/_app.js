import "@/styles/globals.css";
import RootLayout from "@/components/RootLayout";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="font-bodyFont">
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </div>
  );
}
