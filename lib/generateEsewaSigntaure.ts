//@ts-ignore
import CryptoJS from "crypto-js";

export function generateEsewaSignature(message: string): string {
  const secretKey = process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY!;
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  return CryptoJS.enc.Base64.stringify(hash);
}
