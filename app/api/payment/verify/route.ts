import { generateSigntaure } from "@/lib/generateSigntaure";
import { paymentStatus } from "@/lib/paymentStatus";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pidx = searchParams.get("pidx");
  const esewaData = searchParams.get("data");
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
        },
      );
      if (!response.ok) {
        return NextResponse.json(
          { error: "Khalti initiation failed" },
          { status: 500 },
        );
      }
      const data = await response.json();
      const prismaStatus = paymentStatus(data.status);
      await prisma.purchasedItem.update({
        where: {
          transactionId: data.pidx,
        },
        data: { status: prismaStatus },
      });
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      );
    } else if (esewaData) {
      let decodedData: any = atob(esewaData);
      decodedData = await JSON.parse(decodedData);

      const signatureString = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE},signed_field_names=${decodedData.signed_field_names}`;
      const signature = generateSigntaure(signatureString);
      if (signature !== decodedData.signature) {
        throw { message: "Invalid Info", decodedData };
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ESEWA_VERIFY_URL}/api/epay/transaction/status/?product_code=${process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        return NextResponse.json(
          { error: "Esewa initiation failed" },
          { status: 500 },
        );
      }
      const data = await response.json();
      if (
        data.status !== "COMPLETE" ||
        data.transaction_uuid !== decodedData.transaction_uuid ||
        Number(data.total_amount) !== Number(decodedData.total_amount)
      ) {
        throw { message: "Invalid Info", decodedData };
      }
      const prismaStatus = paymentStatus(data.status);
      await prisma.purchasedItem.update({
        where: {
          id: data.transaction_uuid,
        },
        data: { status: prismaStatus },
      });
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 },
    );
  }
}
