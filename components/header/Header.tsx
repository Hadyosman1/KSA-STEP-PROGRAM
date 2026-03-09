import Image from "next/image";
import LangMenu from "../LangMenu";
import logo from "@/public/logo.png";

const Header = () => {
  return (
    <header className="bg-card shadow-2xs">
      <div className="container">
        <div className="flex h-(--header-height) items-center justify-between">
          <div className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              priority
              width={90}
              height={90}
              className="h-full"
            />
          </div>
          <div className="flex items-center gap-1.5">
            {/* <Button size={"lg"}>Get Started</Button> */}
            <LangMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
