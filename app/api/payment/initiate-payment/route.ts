import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { generateSignature } from "@/lib/generateSignature";

const paymentSchema = z.object({
  amount: z.number().positive(),
  method: z.enum(["khalti", "esewa"]),
  userId: z.string().min(1),
  productItems: z
    .array(
      z.object({
        id: z.number(),
        title: z.string(),
        quantity: z.number().int().positive(),
        price: z.number().positive(),
      }),
    )
    .min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = paymentSchema.safeParse({
      ...body,
      amount: Number(body.amount),
    });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const { amount, method, productItems, userId } = parsed.data;

    const purchase = await prisma.purchasedItem.create({
      data: {
        items: productItems,
        totalPrice: amount,
        paymentMethod: method,
        userId,
      },
    });

    switch (method) {
      case "khalti": {
        const khaltiPayload = {
          return_url: `${process.env.BASE_URL}/api/payment/verify`,
          website_url: process.env.BASE_URL!,
          amount: Math.round(amount * 100),
          purchase_order_id: purchase.id,
          purchase_order_name: `Order-${purchase.id}`,
        };
        const response = await fetch(
          `${process.env.KHALTI_URL}/epayment/initiate/`,
          {
            method: "POST",
            headers: {
              Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(khaltiPayload),
          },
        );
        if (!response.ok) {
          await prisma.purchasedItem.update({
            where: { id: purchase.id },
            data: { status: "FAILED" },
          });
          return NextResponse.json(
            { error: "Khalti initiation failed" },
            { status: 500 },
          );
        }
        const data = await response.json();
        await prisma.purchasedItem.update({
          where: { id: purchase.id },
          data: {
            transactionId: data.pidx,
          },
        });
        return NextResponse.json({
          paymentUrl: data.payment_url,
        });
      }

      case "esewa": {
        const esewaConfig = {
          success_url: `${process.env.BASE_URL}/api/payment/verify`,
          failure_url: `${process.env.BASE_URL}/payment/error`,
          product_delivery_charge: "0",
          product_service_charge: "0",
          tax_amount: 0,
          total_amount: amount,
          amount: amount,
          transaction_uuid: purchase.id,
          product_code: process.env.ESEWA_MERCHANT_CODE!,
          signed_field_names: "total_amount,transaction_uuid,product_code",
        };
        const signatureString = `total_amount=${esewaConfig.total_amount},transaction_uuid=${esewaConfig.transaction_uuid},product_code=${esewaConfig.product_code}`;
        const signature = generateSignature(signatureString);
        return NextResponse.json({
          esewaConfig: {
            ...esewaConfig,
            signature,
          },
        });
      }
      default:
        return NextResponse.json(
          { error: "Unsupported payment method" },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Payment Init Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
