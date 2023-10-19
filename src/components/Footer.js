import Image from "next/image";
import logo from "@/images/logo.png";
function Footer() {
  return (
    <div className="flex items-start justify-center w-full h-20 pt-5 bg-amazon_light">
      <Image className="w-24 mr-3" src={logo} alt={"amazon logo"} />
      <p className="text-sm text-gray-300">
        All rights reserved{" "}
        <a className="duration-300 hover:text-white" target="_blank" href="https://www.linkedin.com/in/abdoallah-badr-5b2bb1250/">
          AbdullahBadr
        </a>
      </p>
    </div>
  );
}

export default Footer;
