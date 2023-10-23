import "@/styles/globals.css";
import RootLayout from "@/components/RootLayout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store} >
      <div className="font-bodyFont">
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </div>
    </Provider>
  );
}
