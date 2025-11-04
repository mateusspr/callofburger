// API Route: /api/orders
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
  const orders = await prisma.order.findMany({ include: { items: true } });
  return NextResponse.json(orders);
}
