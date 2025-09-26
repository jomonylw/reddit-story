import { Suspense } from 'react'
import StoryPage from '@/components/StoryPage'
import StoryCardSkeleton from '@/components/StoryCardSkeleton'

export default function Home() {
  return (
    <Suspense fallback={<StoryCardSkeleton />}>
      <StoryPage />
    </Suspense>
  )
}
