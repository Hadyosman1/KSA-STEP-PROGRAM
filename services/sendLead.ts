const API_URL = "https://prep.elmway.sa/send.php";
const SOURCE = "برنامج STEP";

export const ERROR_CODES = {
  invalid_name: {
    ar: "الاسم غير صحيح",
    en: "Invalid name",
  },
  invalid_phone: {
    ar: "رقم الهاتف غير صحيح",
    en: "Invalid phone number",
  },
  invalid_email: {
    ar: "البريد الإلكتروني غير صحيح",
    en: "Invalid email",
  },
  too_fast: {
    ar: "تم إرسال البيانات بسرعة شديدة، انتظر قليلاً",
    en: "You're sending requests too fast, please wait",
  },
  network_error: {
    ar: "حدث خطأ في الاتصال",
    en: "Network error occurred",
  },
  unknown_error: {
    ar: "حدث خطأ غير معروف",
    en: "An unknown error occurred",
  },
  email_failed: {
    ar: "فشل إرسال البريد الإلكتروني",
    en: "Failed to send email",
  },
} as const;

// استخراج نوع الـ error codes
export type ErrorCode = keyof typeof ERROR_CODES;

type SendLeadValues = {
  fullname: string;
  phone: string;
  email?: string;
};

type SendLeadResponse =
  | { success: true }
  | { success: false; errorCode: string };

export const sendLead = async (
  values: SendLeadValues,
): Promise<SendLeadResponse> => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, source: SOURCE }),
    });

    const data = await res.json();

    if (data.success) return { success: true };

    // إذا فيه خطأ من السيرفر، نتأكد إنه واحد من الـ keys المعرفة
    const errorCode: ErrorCode =
      data.error in ERROR_CODES ? data.error : "unknown_error";

    return { success: false, errorCode };
  } catch (err) {
    console.error(err);
    return { success: false, errorCode: "network_error" };
  }
};
