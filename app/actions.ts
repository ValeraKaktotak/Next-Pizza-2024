'use server'

import { cookies } from 'next/headers'

//Prisma-client
import { prisma } from '@/prisma/prisma-client'

//Types
import type { CheckoutFormValues } from '@/shared/constants/checkout-form-schema'
import { OrderStatus } from '@prisma/client'

//Libs
import { sendEmail } from '@/shared/lib/sendEmail'

//Components
import { PayOrderTemplate } from '@/shared/components/shared'

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies()
    const cartToken = cookieStore.get('cartToken')?.value

    if (!cartToken) {
      throw new Error('Cart token not found')
    }

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartItems: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true
              }
            }
          }
        }
      },
      where: {
        token: cartToken
      }
    })

    /* Если корзина не найдена возвращаем ошибку */
    if (!userCart) {
      throw new Error('Cart not found')
    }

    /* Если корзина пустая возвращаем ошибку */
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty')
    }

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: (userCart.totalAmount / 100) * 15 + 250,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItems)
      }
    })

    /* Очищаем корзину */
    await prisma.cart.update({
      where: {
        token: cartToken
      },
      data: {
        totalAmount: 0
      }
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id
      }
    })

    //TODO: Сделать ссылку на оплату paymentUrl
    const paymentUrl = 'http://localhost:3000/'

    //Сервис для отправки email письма, работает только для теста на один зареганный в этом сервисе адрес
    await sendEmail(
      data.email,
      'Next Pizza / Оплатите заказ #' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl
      })
    )

    return paymentUrl
  } catch (err) {
    console.log('[CreateOrder] Server error', err)
  }
}
