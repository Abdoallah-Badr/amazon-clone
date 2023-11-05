import Header from "./header/Header";
import BottomHeader from "./header/BottomHeader";
import Footer from "./Footer";
import Head from "next/head";

function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>Amazon Clone Store</title>
      </Head>
      <Header />
      <BottomHeader />
      {children}
      <Footer />
    </>
  );
}

export default RootLayout;
