import React from 'react'
import { X } from 'lucide-react'

interface TagItemProps {
  text: string
  type: 'flair' | 'tag'
  onClick?: (text: string) => void
  onRemove?: (text: string) => void
}

const TagItem: React.FC<TagItemProps> = ({ text, type, onClick, onRemove }) => {
  const baseClasses =
    'inline-flex items-center text-sm font-medium pl-2.5 pr-2 py-0.5 rounded-md transition-colors'

  const colorClasses = {
    flair: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    tag: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  }

  const hoverClasses = {
    flair: 'hover:bg-pink-200 dark:hover:bg-pink-800',
    tag: 'hover:bg-blue-200 dark:hover:bg-blue-800',
  }

  const removeButtonHoverClasses = {
    flair:
      'hover:bg-pink-200 hover:text-pink-500 dark:hover:bg-pink-800 dark:hover:text-pink-300',
    tag: 'hover:bg-blue-200 hover:text-blue-500 dark:hover:bg-blue-800 dark:hover:text-blue-300',
  }

  const removeButtonColorClasses = {
    flair: 'text-pink-400',
    tag: 'text-blue-400',
  }

  const Component = onClick && !onRemove ? 'button' : 'span'

  return (
    <Component
      className={`${baseClasses} ${colorClasses[type]} ${onClick && !onRemove ? hoverClasses[type] : ''}`}
      onClick={() => onClick?.(text)}
    >
      #{text}
      {onRemove && (
        <button
          onClick={() => onRemove(text)}
          className={`ml-1.5 flex-shrink-0 h-4 w-4 rounded-xl inline-flex items-center justify-center ${removeButtonColorClasses[type]} ${removeButtonHoverClasses[type]}`}
        >
          <span className='sr-only'>Remove {text}</span>
          <X size={12} />
        </button>
      )}
    </Component>
  )
}

export default TagItem
