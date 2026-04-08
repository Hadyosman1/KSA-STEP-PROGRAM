"use client";

import { ERROR_CODES, sendLead } from "@/services/sendLead";
import { zodResolver } from "@hookform/resolvers/zod";
import { Locale, useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import z from "zod";
import { BlurIn, FadeUp } from "../motion-wrappers";
import { SuccessDialog } from "../success-dialog";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";

const getFormSchema = (locale: Locale) =>
  z.object({
    fullName: z
      .string()
      .trim()
      .min(
        2,
        locale === "ar"
          ? "الاسم الكامل يجب ان يكون علي الاقل 2 حرف"
          : "Full name must be at least 2 characters",
      )
      .max(
        60,
        locale === "ar"
          ? "الحد الأقصى للاسم الكامل هو 60 حرف"
          : "Full name must be at most 60 characters",
      ),
    phone: z.string().refine(isValidPhoneNumber, {
      message: locale === "ar" ? "رقم الهاتف غير صالح" : "Invalid phone number",
    }),
    email: z
      .string()
      .email(
        locale === "ar"
          ? "البريد الإلكتروني غير صحيح"
          : "Invalid email address",
      )
      .optional()
      .or(z.literal("")),
  });

const LeadForm = () => {
  const t = useTranslations("LeadForm");
  const locale = useLocale();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const formSchema = getFormSchema(locale);
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const result = await sendLead({
      fullname: data.fullName,
      phone: data.phone,
      email: data.email || undefined,
    });

    if (!result.success) {
      toast.error(
        ERROR_CODES[result.errorCode as keyof typeof ERROR_CODES][
          locale === "ar" ? "ar" : "en"
        ],
      );
    } else {
      // Reset form
      form.reset();
      // Show success dialog
      setShowSuccessDialog(true);
    }
  };

  return (
    <section
      id="lead-form-section"
      className="from-brand-dark-blue via-brand-dark-blue to-brand-green bg-linear-to-br"
    >
      <div className="container flex min-h-[70vh] flex-col items-center justify-center space-y-8 py-14">
        <BlurIn delay={0.1} className="space-y-6">
          <h2 className="text-background mx-auto text-center text-2xl leading-9 font-bold md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="text-background mx-auto max-w-2xl text-center text-lg font-semibold md:text-lg lg:text-xl">
            {t("subtitle")}
          </p>
        </BlurIn>

        <FadeUp delay={0.1} className="w-full max-w-2xl">
          <Card>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <FieldGroup className="gap-3">
                  {/* FULLNAME */}
                  <Controller
                    name="fullName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="fullName">
                          {t("form.fields.fullName")}
                        </FieldLabel>
                        <Input
                          {...field}
                          id="fullName"
                          type="text"
                          placeholder="Mohammed qasim"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* EMAIL */}
                  <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="phone">
                          {t("form.fields.phone")}
                        </FieldLabel>
                        <PhoneInput
                          id="phone"
                          defaultCountry="SA"
                          international={true}
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* EMAIL */}
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">
                          {t("form.fields.email")}{" "}
                          <span className="text-muted-foreground">
                            ({locale === "ar" ? "اختياري" : "Optional"})
                          </span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="example@mail.com"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <p>{t("form.footer")}</p>

                  <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className={"w-fit"}
                    size={"lg"}
                  >
                    {t("form.fields.submit")}
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </FadeUp>
      </div>

      {/* Success Dialog */}
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        locale={locale}
      />
    </section>
  );
};

export default LeadForm;
