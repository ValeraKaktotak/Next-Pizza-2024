//Components
import { Container, Filters, Title, TopBar } from '@/components/shared'

export default function Home() {
  return (
    <>
      <Container className='mt-10'>
        <Title text='Все пиццы' size='lg' className='font-extrabold' />
      </Container>

      <TopBar />

      <Container className='pp-14 pb-14'>
        <div className='flex gap-[60px]'>
          {/* Filtering */}
          <div className='w-[250px]'>
            <Filters />
          </div>

          {/* Goods List */}
          <div className='flex-1'>
            <div className='flex flex-col gap-16'>Goods List</div>
          </div>
        </div>
      </Container>
    </>
  )
}
