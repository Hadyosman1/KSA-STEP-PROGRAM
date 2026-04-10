"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SuccessDialog = ({ open, onOpenChange }: SuccessDialogProps) => {
  const t = useTranslations("SuccessPage");

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={""}>
        <AlertDialogHeader className="flex w-full flex-col items-center justify-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <HugeiconsIcon
              icon={Tick02Icon}
              className="h-8 w-8 stroke-3 text-green-600"
            />
          </div>

          <AlertDialogTitle className={"w-full text-center text-green-600"}>
            {t("title")}
          </AlertDialogTitle>
          <AlertDialogDescription className={"w-full text-center"}>
            {t("description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className={"w-full"}
            size="lg"
            onClick={() => onOpenChange(false)}
          >
            {t("button")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
