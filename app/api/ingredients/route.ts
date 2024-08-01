import { NextResponse } from 'next/server'

//prisma-client
import { prisma } from '@/prisma/prisma-client'

export async function GET() {
  const ingredients = await prisma.ingredient.findMany()

  return NextResponse.json(ingredients)
}
