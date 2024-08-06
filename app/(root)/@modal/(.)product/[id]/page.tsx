import { notFound } from 'next/navigation'

//prisma-client
import { prisma } from '@/prisma/prisma-client'

//Components
import { ChooseProductModal } from '@/components/shared'

interface props {
  params: {
    id: string
  }
}

const ProductModalPage = async ({ params }: props) => {
  const { id } = params
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      variants: true
    }
  })

  if (!product) {
    return notFound()
  }

  return <ChooseProductModal product={product} />
}
export default ProductModalPage
