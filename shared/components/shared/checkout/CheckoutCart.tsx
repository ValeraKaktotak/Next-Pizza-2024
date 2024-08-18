import React from 'react'

//Libs
import { getCartItemDetails } from '@/shared/lib/getCartItemDetails'

//Types
import type { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import { CartStateItem } from '@/shared/lib/getCartDetails'

//Components
import { CheckoutItem, WhiteBlock } from '@/shared/components/shared'

interface Props {
  items: CartStateItem[]
  onClickCountButton: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => void
  removeCartItem: (id: number) => void
  className?: string
}

export const CheckoutCart: React.FC<Props> = ({
  className,
  items,
  onClickCountButton,
  removeCartItem
}) => {
  return (
    <WhiteBlock title='1. Корзина' className={className}>
      <div className='flex flex-col gap-5'>
        {items.map((item) => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            details={getCartItemDetails({
              ingredients: item.ingredients,
              pizzaType: item.pizzaType as PizzaType,
              pizzaSize: item.pizzaSize as PizzaSize
            })}
            disabled={item.disabled}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onClickCountButton={(type) => {
              onClickCountButton(item.id, item.quantity, type)
            }}
            onClickRemove={() => removeCartItem(item.id)}
          />
        ))}
      </div>
    </WhiteBlock>
  )
}
