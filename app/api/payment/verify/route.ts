import { mapKhaltiStatusToEnum } from "@/lib/paymentStatus";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pidx = searchParams.get("pidx");

  try {
    if (pidx) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_KHALTI_URL}/epayment/lookup/`,
        {
          method: "POST",
          headers: {
            Authorization: `Key ${process.env.NEXT_PUBLIC_KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pidx }),
        }
      );
      if (!response.ok) {
        return NextResponse.json(
          { error: "Khalti initiation failed" },
          { status: 500 }
        );
      }
      const data = await response.json();
      const prismaStatus = mapKhaltiStatusToEnum(data.status);
      await prisma.purchasedItem.update({
        where: {
          transactionId: data.pidx,
        },
        data: { status: prismaStatus },
      });
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/success`
      );
    }else{
      
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
