import "@/styles/globals.css";
import RootLayout from "@/components/RootLayout";

export default function App({ Component, pageProps }) {
  return (
    <div className="font-bodyFont">
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </div>
  );
}
