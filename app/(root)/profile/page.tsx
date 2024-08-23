import { redirect } from 'next/navigation'

//prisma-client
import { prisma } from '@/prisma/prisma-client'

//Libs
import { getUserSession } from '@/shared/lib/getUserSession'

export default async function ProfilePage() {
  const session = await getUserSession()

  if (!session) {
    return redirect('/not-auth')
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) }
  })

  if (!user) {
    return redirect('/not-auth')
  }

  //return <ProfileForm data={user} />
  return <div>PROFILE FORM</div>
}
