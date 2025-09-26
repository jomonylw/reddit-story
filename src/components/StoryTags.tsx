import { Story } from '@/lib/types'
import TagItem from './TagItem'

interface StoryTagsProps {
  story: Pick<Story, 'link_flair_text' | 'tags'>
  onTagClick: (tag: string, type: 'flair' | 'tag') => void
}

export default function StoryTags({ story, onTagClick }: StoryTagsProps) {
  const flairTag = story.link_flair_text ? story.link_flair_text.trim() : null
  const normalTags = story.tags
    ? story.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    : []

  if (!flairTag && normalTags.length === 0) {
    return null
  }

  return (
    <div className='mt-2 text-sm text-muted-foreground mb-3 flex items-center gap-2 flex-wrap'>
      {/* <span>标签:</span> */}
      {flairTag && (
        <TagItem
          text={flairTag}
          type='flair'
          onClick={(tag) => onTagClick(tag, 'flair')}
        />
      )}
      {normalTags.map((tag, index) => (
        <TagItem
          key={index}
          text={tag}
          type='tag'
          onClick={(tag) => onTagClick(tag, 'tag')}
        />
      ))}
    </div>
  )
}
