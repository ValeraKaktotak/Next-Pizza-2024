// 'use client'
// import { useSearchParams } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { useSet } from 'react-use'

// //Types
// import type { Ingredient } from '@prisma/client'

// //Services
// import { Api } from '@/services/api-client'

// interface useFilterIngredientsProps {
//   ingredients: Ingredient[]
//   loading: boolean
//   selectedIngredients: Set<string>
//   onAddId: (id: string) => void
// }

// export const useFilterIngredients = (): useFilterIngredientsProps => {
//   const searchParams = useSearchParams()

// const [ingredients, setIngredients] = useState<Ingredient[]>([])
// const [loading, setLoading] = useState<boolean>(false)

//const [selectedIds, { toggle }] = useSet(new Set<string>([]))
// const [selectedIds, { toggle }] = useSet(
//   new Set<string>(
//     searchParams.has('selectedIngredients')
//       ? searchParams.get('selectedIngredients')?.split(',')
//       : []
//   )
// )

// const fetchIngredients = async () => {
//   try {
//     setLoading(true)
//     const res = await Api.ingredients.getAllIngredients()
//     setIngredients(res)
//   } catch (error) {
//     console.log(error)
//   } finally {
//     setLoading(false)
//   }
// }

// useEffect(() => {
//   fetchIngredients()
// }, [])

// return {
//   ingredients,
//   loading,
//   selectedIngredients: selectedIds,
//   onAddId: toggle
// }
//}
