import { notFound } from 'next/navigation'

//prisma-client
import { prisma } from '@/prisma/prisma-client'

//Components
import { Container, ProductForm } from '@/shared/components/shared'

interface props {
  params: {
    id: string
  }
}

const ProductPage = async ({ params }: props) => {
  const { id } = params
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      variants: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      category: {
        include: {
          products: {
            include: {
              variants: true
            }
          }
        }
      }
    }
  })

  if (!product) {
    return notFound()
  }

  return (
    <Container className='my-10 flex flex-col'>
      <ProductForm product={product} />
    </Container>
  )
}

export default ProductPage
