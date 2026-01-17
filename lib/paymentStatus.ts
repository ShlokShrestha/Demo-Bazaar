import { PurchaseStatus } from "@/app/generated/prisma/enums";

export function mapKhaltiStatusToEnum(khaltiStatus: string): PurchaseStatus {
  switch (khaltiStatus) {
    case "Completed":
    case "success":
      return PurchaseStatus.COMPLETED;
    case "Failed":
    case "failed":
      return PurchaseStatus.FAILED;
    case "Pending":
    case "pending":
      return PurchaseStatus.PENDING;
    case "Expired":
    case "expired":
      return PurchaseStatus.EXPIRED;
    default:
      return PurchaseStatus.PENDING;
  }
}
