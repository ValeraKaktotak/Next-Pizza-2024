import { Container, Title, WhiteBlock } from '@/shared/components/shared'

export default function CheckoutPage() {
  return (
    <Container>
      <Title
        text='Оформление заказа'
        className='mb-8 mt-10 text-[36px] font-extrabold'
      />
      <WhiteBlock title='1. Корзина'>123</WhiteBlock>
      <WhiteBlock title='2. Персональные данные'>123</WhiteBlock>
    </Container>
  )
}
