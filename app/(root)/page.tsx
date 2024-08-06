//Components
import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar
} from '@/shared/components/shared'

//Prisma-client
import { prisma } from '@/prisma/prisma-client'

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          variants: true
        }
      }
    }
  })

  return (
    <>
      <Container className='mt-10'>
        <Title text='Все пиццы' size='lg' className='font-extrabold' />
      </Container>

      <TopBar
        categories={categories.filter((cat) => cat.products.length > 0)}
      />

      <Container className='pp-14 pb-14'>
        <div className='flex gap-[60px]'>
          {/* Filtering */}
          <div className='w-[250px]'>
            <Filters />
          </div>

          {/* Goods List */}
          <section className='flex-1'>
            <div className='flex flex-col gap-16'>
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      categoryId={category.id}
                      title={category.name}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </section>
        </div>
      </Container>
    </>
  )
}
