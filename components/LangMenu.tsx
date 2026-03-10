"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";
import { Globe02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLocale } from "next-intl";

const LangMenu = () => {
  const locale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size={"icon-lg"} />}
      >
        <HugeiconsIcon icon={Globe02Icon} />
        <span className="sr-only">
          {locale === "ar" ? "تغيير اللغة" : "Change the language"}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={"bottom"} align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            {locale === "ar" ? "اللغة" : "Language"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            render={
              <Link href="/" locale="en" scroll={false}>
                {locale === "en" && <HugeiconsIcon icon={Tick02Icon} />}
                English
              </Link>
            }
          />
          <DropdownMenuItem
            render={
              <Link href="/" locale="ar" scroll={false}>
                {locale === "ar" && <HugeiconsIcon icon={Tick02Icon} />}
                عربي
              </Link>
            }
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangMenu;
