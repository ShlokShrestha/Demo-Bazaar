import { generateSignature } from "@/lib/generateSignature";
import { paymentStatus } from "@/lib/paymentStatus";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function redirectSuccess() {
  return NextResponse.redirect(`${process.env.BASE_URL}/success`);
}

function redirectFailure() {
  return NextResponse.redirect(`${process.env.BASE_URL}/payment/error`);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pidx = searchParams.get("pidx");
  const esewaData = searchParams.get("data");
  try {
    if (pidx) {
      const response = await fetch(
        `${process.env.KHALTI_URL}/epayment/lookup/`,
        {
          method: "POST",
          headers: {
            Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pidx }),
        },
      );
      if (!response.ok) return redirectFailure();
      const data = await response.json();
      if (data.status !== "Completed")
        return NextResponse.redirect(`${process.env.BASE_URL}/payment/error`);
      const prismaStatus = paymentStatus(data.status);
      await prisma.purchasedItem.update({
        where: {
          transactionId: pidx,
        },
        data: { status: prismaStatus },
      });
      return redirectSuccess();
    } else if (esewaData) {
      const decodedData = JSON.parse(
        Buffer.from(esewaData, "base64").toString("utf-8"),
      );
      const signatureString = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_MERCHANT_CODE},signed_field_names=${decodedData.signed_field_names}`;
      const expectedSignature = generateSignature(signatureString);

      if (expectedSignature !== decodedData.signature) {
        throw { message: "Invalid Info", decodedData };
      }

      const response = await fetch(
        `${process.env.ESEWA_URL}/api/epay/transaction/status/?product_code=${process.env.ESEWA_MERCHANT_CODE}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) return redirectFailure();
      const data = await response.json();
      if (
        data.status !== "COMPLETE" ||
        data.transaction_uuid !== decodedData.transaction_uuid ||
        Number(data.total_amount) !== Number(decodedData.total_amount)
      ) {
        return redirectFailure();
      }
      const prismaStatus = paymentStatus(data.status);
      await prisma.purchasedItem.update({
        where: {
          id: data.transaction_uuid,
        },
        data: { status: prismaStatus },
      });
      return redirectSuccess();
    }
    return redirectFailure();
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 },
    );
  }
}
