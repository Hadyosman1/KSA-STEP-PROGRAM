import logo from "@/public/logo.png";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className=" border-t">
      <div className="container py-10">
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={150}
          placeholder="blur"
        />

        <p className="leading-8 text-pretty">{t("description")}</p>

        <p className="text-primary mt-6 text-center">
          {t("copyright")} &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
