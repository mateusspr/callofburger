// API Route: /api/restaurants
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
  const restaurants = await prisma.restaurant.findMany();
  return NextResponse.json(restaurants);
}
