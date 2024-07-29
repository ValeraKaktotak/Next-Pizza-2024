//Components
import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar
} from '@/components/shared'

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
            <div className='flex flex-col gap-16'>
              <ProductsGroupList
                title='Пиццы'
                items={[
                  {
                    id: 1,
                    name: 'Чизбургер-пицца',
                    imageUrl: '',
                    price: 550,
                    items: [{ price: 550 }]
                  },
                  {
                    id: 2,
                    name: 'Чизбургер-пицца',
                    imageUrl: '',
                    price: 550,
                    items: [{ price: 550 }]
                  },
                  {
                    id: 3,
                    name: 'Чизбургер-пицца',
                    imageUrl: '',
                    price: 550,
                    items: [{ price: 550 }]
                  },
                  {
                    id: 4,
                    name: 'Чизбургер-пицца',
                    imageUrl: '',
                    price: 550,
                    items: [{ price: 550 }]
                  },
                  {
                    id: 5,
                    name: 'Чизбургер-пицца',
                    imageUrl: '',
                    price: 550,
                    items: [{ price: 550 }]
                  },
                  {
                    id: 6,
                    name: 'Чизбургер-пицца',
                    imageUrl: '',
                    price: 550,
                    items: [{ price: 550 }]
                  }
                ]}
                categoryId={1}
              />

              <ProductsGroupList
                title='Закуски'
                items={[
                  {
                    id: 7,
                    name: 'Чизбургер-пицца',
                    imageUrl: '',
                    price: 550,
                    items: [{ price: 550 }]
                  },
                  {
                    id: 8,
                    name: 'Чизбургер-пицца',
                    imageUrl: '',
                    price: 550,
                    items: [{ price: 550 }]
                  },
                  {
                    id: 9,
                    name: 'Чизбургер-пицца',
                    imageUrl: '',
                    price: 550,
                    items: [{ price: 550 }]
                  },
                  {
                    id: 10,
                    name: 'Чизбургер-пицца',
                    imageUrl: '',
                    price: 550,
                    items: [{ price: 550 }]
                  },
                  {
                    id: 11,
                    name: 'Чизбургер-пицца',
                    imageUrl: '',
                    price: 550,
                    items: [{ price: 550 }]
                  },
                  {
                    id: 12,
                    name: 'Чизбургер-пицца',
                    imageUrl: '',
                    price: 550,
                    items: [{ price: 550 }]
                  }
                ]}
                categoryId={3}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
