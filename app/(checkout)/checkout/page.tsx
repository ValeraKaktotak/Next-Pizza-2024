import { ArrowRight, Package, Percent, Truck } from 'lucide-react'

//Components
import {
  CheckoutItem,
  CheckoutItemDetails,
  Container,
  Title,
  WhiteBlock
} from '@/shared/components/shared'
import { Button, Input, Textarea } from '@/shared/components/ui'

export default function CheckoutPage() {
  return (
    <Container>
      <Title
        text='Оформление заказа'
        className='mb-8 mt-10 text-[36px] font-extrabold'
      />
      <div className='flex gap-10'>
        {/* Left Side */}
        <div className='mb-20 flex flex-1 flex-col gap-10'>
          <WhiteBlock title='1. Корзина'>
            <div className='flex flex-col gap-5'>
              <CheckoutItem
                id={1}
                imageUrl='http://localhost:3000/images/pizzas/Cheese.webp'
                details='test description test test test'
                name='Test pizza name'
                price={216}
                quantity={3}
              />
              <CheckoutItem
                id={1}
                imageUrl='http://localhost:3000/images/pizzas/Cheese.webp'
                details='test description test test test'
                name='Test pizza name'
                price={216}
                quantity={3}
              />
            </div>
          </WhiteBlock>

          <WhiteBlock title='2. Персональные данные'>
            <div className='grid grid-cols-2 gap-5'>
              <Input name='firstName' className='text-base' placeholder='Имя' />
              <Input
                name='lastName'
                className='text-base'
                placeholder='Фамилия'
              />
              <Input name='email' className='text-base' placeholder='E-mail' />
              <Input name='phone' className='text-base' placeholder='Телефон' />
            </div>
          </WhiteBlock>

          <WhiteBlock title='3. Адрес доставки'>
            <div className='flex flex-col gap-5'>
              <Input
                name='address'
                className='text-base'
                placeholder='Введите адрес'
              />
              <Textarea
                rows={5}
                className='text-base'
                placeholder='Комментарий к заказу'
              />
            </div>
          </WhiteBlock>
        </div>

        {/* Right Side */}
        <div className='w-[450px]'>
          <WhiteBlock className='sticky top-4 p-6'>
            <div className='flex flex-col gap-1'>
              <span className='text-xl'>Итого:</span>
              <span className='text-[34px] font-extrabold'>3506 ₽</span>
            </div>

            <CheckoutItemDetails
              title={
                <div className='flex items-center'>
                  <Package className='mr-2' size={18} />
                  Стоимость товаров
                </div>
              }
              value='3000'
            />
            <CheckoutItemDetails
              title={
                <div className='flex items-center'>
                  <Percent className='mr-2' size={18} />
                  Налоги
                </div>
              }
              value='206'
            />
            <CheckoutItemDetails
              title={
                <div className='flex items-center'>
                  <Truck className='mr-2' size={18} />
                  Доставка
                </div>
              }
              value='300'
            />

            <Button
              type='submit'
              className='mt-6 h-14 w-full rounded-2xl text-base font-bold'
            >
              Перейти к оплате
              <ArrowRight className='ml-2 w-5' />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  )
}
