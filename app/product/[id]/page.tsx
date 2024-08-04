import { notFound } from 'next/navigation'

//prisma-client
import { prisma } from '@/prisma/prisma-client'

//Components
import { Container } from '@/components/shared'

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
      <ProductImage src={product.imageUrl} alt={product.name} />
    </Container>
  )
}

export default ProductPage
