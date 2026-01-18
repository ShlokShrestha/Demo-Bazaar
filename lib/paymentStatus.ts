import { PurchaseStatus } from "@/app/generated/prisma/enums";

export function paymentStatus(khaltiStatus: string): PurchaseStatus {
  switch (khaltiStatus) {
    case "Completed":
    case "COMPLETE":
    case "success":
      return PurchaseStatus.COMPLETED;
    case "Failed":
    case "failed":
    case "CANCELED":
      return PurchaseStatus.FAILED;
    case "Pending":
    case "PENDING":
    case "pending":
      return PurchaseStatus.PENDING;
    case "Expired":
    case "expired":
      return PurchaseStatus.EXPIRED;
    default:
      return PurchaseStatus.PENDING;
  }
}
