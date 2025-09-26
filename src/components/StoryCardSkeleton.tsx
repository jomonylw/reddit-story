import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function StoryCardSkeleton() {
  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex justify-between items-start gap-2'>
          <div className='flex-1 space-y-2 py-1'>
            <div className='h-6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='h-8 w-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
            <div className='h-8 w-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          <div className='h-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
          <div className='h-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
          <div className='h-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse w-3/4'></div>
          <div className='h-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse w-1/2'></div>
        </div>
        <div className='flex justify-between items-center mt-6'>
          <div className='h-5 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
          <div className='h-5 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
        </div>
        <div className='flex flex-wrap gap-2 mt-4'>
          <div className='h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
          <div className='h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
          <div className='h-6 w-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
        </div>
        <div className='mt-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800'>
          <div className='h-4 w-1/4 mb-2 rounded bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
          <div className='space-y-2'>
            <div className='h-3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse'></div>
            <div className='h-3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse w-5/6'></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
