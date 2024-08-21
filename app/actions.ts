'use server'
import { cookies } from 'next/headers'

//Prisma-client
import { prisma } from '@/prisma/prisma-client'

//Types
import type { CheckoutFormValues } from '@/shared/constants/checkout-form-schema'
import { OrderStatus } from '@prisma/client'

export async function createOrder(data: CheckoutFormValues) {
  const cookieStore = cookies()
  const cartToken = cookieStore.get('cartToken')?.value

  if (!cartToken) {
    throw new Error('Cart token not found')
  }

  await prisma.order.create({
    data: {
      token: cartToken,
      status: OrderStatus.PENDING,
      totalAmount: 1000,
      items: [],
      fullName: data.firstName + ' ' + data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      comment: data.comment
    }
  })
  return 'https://github.com/ValeraKaktotak'
}
