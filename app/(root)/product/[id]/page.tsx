import { notFound } from 'next/navigation'

//prisma-client
import { prisma } from '@/prisma/prisma-client'

//Components
import {
  Container,
  GroupVariants,
  PizzaImage,
  Title
} from '@/components/shared'

interface props {
  params: {
    id: string
  }
}

const ProductPage = async ({ params }: props) => {
  const { id } = params
  const product = await prisma.product.findFirst({
    where: { id: Number(id) }
  })

  if (!product) {
    return notFound()
  }
  return (
    <Container className='my-10 flex flex-col'>
      <div className='flex'>
        <PizzaImage imageUrl={product.imageUrl} alt={product.name} size={40} />

        <div className='w-[490px] bg-[#fff9f0] p-7'>
          <Title
            text={product.name}
            size='md'
            className='mb-1 font-extrabold'
          />

          <p className='text-gray-400'>EXTRA INFO</p>

          <GroupVariants
            value='2'
            items={[
              {
                name: 'Little',
                value: '1'
              },
              {
                name: 'Medium',
                value: '2'
              },
              {
                name: 'Large',
                value: '3',
                disabled: true
              }
            ]}
          />
        </div>
      </div>
    </Container>
  )
}

export default ProductPage
