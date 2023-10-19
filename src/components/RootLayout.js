import Header from "./header/Header"
import BottomHeader from "./header/BottomHeader"
import Footer from "./Footer"

function RootLayout({children}) {
  return (
    <>
    <Header/>
    <BottomHeader/>
    {children}
    <Footer/>
    </>
  )
}

export default RootLayout