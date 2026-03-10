import logo from "@/public/logo.png";
import { Calendar02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLocale } from "next-intl";
import Image from "next/image";
import LangMenu from "../LangMenu";
import { Button } from "../ui/button";

const Header = () => {
  const locale = useLocale();

  return (
    <header className="bg-card sticky top-0 z-50 shadow-2xs">
      <div className="container">
        <div className="flex h-(--header-height) items-center justify-between">
          <div className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              priority
              width={80}
              height={80}
              className="h-full"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Button size={"lg"}>
              {locale === "ar" ? "احجز الآن" : "Book Now"}
              <HugeiconsIcon icon={Calendar02Icon} className="size-4.5" />
            </Button>
            <LangMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
