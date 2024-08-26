import { Suspense } from 'react'

//Components
import {
  Container,
  Filters,
  ProductsGroupList,
  Stories,
  Title,
  TopBar
} from '@/shared/components/shared'
//Types
import type { GetSearchParams } from '@/shared/lib/findPizzas'
//Prisma-client
import { findPizzas } from '@/shared/lib/findPizzas'

export default async function Home({
  searchParams
}: {
  searchParams: GetSearchParams
}) {
  const categories = await findPizzas(searchParams)

  return (
    <>
      <Container className='mt-10'>
        <Title text='Все пиццы' size='lg' className='font-extrabold' />
      </Container>

      <TopBar
        categories={categories.filter((cat) => cat.products.length > 0)}
      />

      <Stories className='hidden sm:flex' />

      <Container className='pp-14 pb-14'>
        <div className='flex gap-[60px]'>
          {/* Filtering */}
          <div className='hidden w-[250px] lg:flex'>
            <Suspense>
              <Filters />
            </Suspense>
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
