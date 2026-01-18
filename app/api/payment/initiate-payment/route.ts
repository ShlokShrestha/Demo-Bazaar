import { generateSigntaure } from "@/lib/generateSigntaure";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount, method, productItems, userId } = await req.json();
    if (!amount || !productItems || !method || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const productName = productItems
      .map(
        (item: any) => `${item.id}:${item.title}:${item.quantity}:${item.price}`
      )
      .join(",");
    const purchase = await prisma.purchasedItem.create({
      data: {
        items: productItems,
        totalPrice: amount,
        paymentMethod: method,
        userId,
      },
    });
    if (!purchase) {
      return NextResponse.json(
        { error: "Failed to create purchase item" },
        { status: 500 }
      );
    }
    switch (method) {
      case "khalti":
        const khaltiConfig = {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/verify/`,
          website_url: process.env.NEXT_PUBLIC_BASE_URL!,
          amount: Math.round(parseFloat(amount) * 100),
          purchase_order_id: purchase.id,
          purchase_order_name: productName,
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_KHALTI_URL}/epayment/initiate/`,
          {
            method: "POST",
            headers: {
              Authorization: `Key ${process.env.NEXT_PUBLIC_KHALTI_SECRET_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(khaltiConfig),
          }
        );
        if (!response.ok) {
          return NextResponse.json(
            { error: "Khalti initiation failed" },
            { status: 500 }
          );
        }
        const data = await response.json();
        await prisma.purchasedItem.update({
          where: {
            id: purchase.id,
          },
          data: { transactionId: data.pidx },
        });
        return NextResponse.json({ khaltiPaymentUrl: data.payment_url });
      case "esewa":
        const esewaConfig = {
          failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}/error`,
          product_delivery_charge: "0",
          product_service_charge: "0",
          product_code: process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE,
          signed_field_names: "total_amount,transaction_uuid,product_code",
          success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/verify`,
          tax_amount: 0,
          total_amount: amount,
          amount: amount,
          transaction_uuid: purchase.id,
        };
        const signatureString = `total_amount=${esewaConfig.total_amount},transaction_uuid=${esewaConfig.transaction_uuid},product_code=${esewaConfig.product_code}`;
        const signature = generateSigntaure(signatureString);
        return NextResponse.json({
          esewaConfig: { ...esewaConfig, signature },
        });
      default:
        return NextResponse.json(
          { error: "Invalid payment method" },
          { status: 400 }
        );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
