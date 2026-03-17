<?php

header("Content-Type: application/json");

// السماح فقط بطلبات POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["success" => false]);
  exit;
}

// السماح فقط من نفس الدومين
$allowedOrigins = [
  "https://prep.elmway.sa",
];

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";

if (!in_array($origin, $allowedOrigins)) {
  http_response_code(403);
  echo json_encode(["success" => false]);
  exit;
}

// قراءة البيانات
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
  echo json_encode(["success" => false]);
  exit;
}

// تنظيف البيانات
$name = trim($data["fullname"] ?? "");
$phone = trim($data["phone"] ?? "");
$email = trim($data["email"] ?? "");
$source = trim($data["source"] ?? "Lead Form");

// validation
if (strlen($name) < 2) {
  echo json_encode(["success" => false, "error" => "invalid_name"]);
  exit;
}

if (strlen($phone) < 6) {
  echo json_encode(["success" => false, "error" => "invalid_phone"]);
  exit;
}

if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(["success" => false, "error" => "invalid_email"]);
  exit;
}

// honeypot لمنع bots
if (!empty($data["website"])) {
  echo json_encode(["success" => true]);
  exit;
}

// rate limit بسيط
$ip = $_SERVER["REMOTE_ADDR"];
$file = sys_get_temp_dir() . "/lead_" . md5($ip) . ".txt";

if (file_exists($file)) {
  $last = file_get_contents($file);
  if (time() - $last < 30) {
    echo json_encode(["success" => false, "error" => "too_fast"]);
    exit;
  }
}

file_put_contents($file, time());

// إعداد الإيميل
$to = "ali@alhaiti.com";

$subject = "New Lead - " . $source;

$message .= "Source: $source\n";
$message .= "Name: $name\n";
$message .= "Phone: $phone\n";
$message .= "Email: $email\n";
$message .= "IP: $ip\n";
$message .= "Time: " . date("Y-m-d H:i:s") . "\n";

$headers = [];
$headers[] = "From: Website <noreply@prep.elmway.sa>";

if ($email) {
  $headers[] = "Reply-To: " . $email;
}
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$success = mail($to, $subject, $message, implode("\r\n", $headers));

if ($success) {
  echo json_encode(["success" => true]);
} else {
  // إذا البريد الإلكتروني لم يُرسل، نرجع كود خطأ محدد
  echo json_encode([
    "success" => false,
    "error" => "email_failed"
  ]);
}