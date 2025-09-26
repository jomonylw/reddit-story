import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Story } from '@/lib/types'
import AiReviewCard from './AiReviewCard'
import StoryTags from './StoryTags'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { ArrowLeftRight, SquareArrowOutUpRight, ThumbsUp } from 'lucide-react'
import Score from './Score'

interface StoryCardProps {
  story: Story
  onTagClick: (tag: string, type: 'flair' | 'tag') => void
}

export default function StoryCard({ story, onTagClick }: StoryCardProps) {
  const [language, setLanguage] = useState('cn')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      const links = contentRef.current.querySelectorAll('a')
      links.forEach((link) => {
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
      })
    }
  }, [story, language])

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'cn' ? 'en' : 'cn'))
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex justify-between items-start items-center gap-2'>
          <CardTitle className='text-xl font-semibold leading-snug tracking-tight flex-1'>
            {language === 'cn' ? story.title_cn || story.title : story.title}
          </CardTitle>
          <button
            onClick={() =>
              window.open(`https://www.reddit.com${story.permalink}`, '_blank')
            }
            className='p-1 text-muted-foreground hover:text-foreground'
            title='Open on Reddit'
          >
            <SquareArrowOutUpRight size={16} />
          </button>
          <button
            onClick={handleLanguageToggle}
            className='p-1 text-muted-foreground hover:text-foreground'
          >
            <ArrowLeftRight size={16} />
          </button>
        </div>
        {/* <CardDescription className="text-sm text-muted-foreground">
          {story.one_line_summary || '无摘要'}
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <div
          ref={contentRef}
          className='prose prose-lg max-w-none mb-4 [&_p]:indent-8 dark:prose-invert story-content'
          dangerouslySetInnerHTML={{
            __html:
              (language === 'cn'
                ? story.selftext_html_cn
                : story.selftext_html) ||
              story.selftext_html ||
              '',
          }}
        />

        <div className='flex justify-between items-center text-sm text-muted-foreground mt-4'>
          <div className='flex items-center mb-2'>
            <div className='w-5 h-5 mr-1.5 rounded-full bg-white flex justify-center items-center'>
              <Image
                src='/reddit.svg'
                alt='Reddit icon'
                width={16}
                height={16}
              />
            </div>
            <Score score={story.score} label='Reddit 分数' color='orange' />
            <span className='ml-2 inline-flex items-center rounded-sm bg-green-50 px-1 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20'>
              {Math.round(story.upvote_ratio * 100)}%
              <ThumbsUp size={12} className='ml-1' />
            </span>
          </div>
          <span>{new Date(story.created_utc).toLocaleDateString()}</span>
        </div>
        <StoryTags story={story} onTagClick={onTagClick} />
        <AiReviewCard story={story} />
      </CardContent>
    </Card>
  )
}
