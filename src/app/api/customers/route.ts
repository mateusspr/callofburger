// API Route: /api/customers
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
  const customers = await prisma.customer.findMany();
  return NextResponse.json(customers);
}
