// API Route: /api/products
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}
