import { Trash2 } from 'lucide-react'
import React from 'react'
import TagItem from './TagItem'

interface SelectedFiltersProps {
  selectedFlair: string | null
  selectedTags: string[]
  clearFlairFilter: () => void
  handleRemoveTag: (tag: string) => void
  clearTagFilter: () => void
}

const SelectedFilters: React.FC<SelectedFiltersProps> = ({
  selectedFlair,
  selectedTags,
  clearFlairFilter,
  handleRemoveTag,
  clearTagFilter,
}) => {
  if (!selectedFlair && selectedTags.length === 0) {
    return null
  }

  return (
    <div className='flex items-center flex-wrap gap-2 bg-background p-2 rounded-md'>
      {/* <span className="font-semibold">筛选:</span> */}
      {selectedFlair && (
        <TagItem
          text={selectedFlair}
          type='flair'
          onRemove={clearFlairFilter}
        />
      )}
      {selectedTags.map((tag) => (
        <TagItem key={tag} text={tag} type='tag' onRemove={handleRemoveTag} />
      ))}
      <button
        onClick={() => {
          clearFlairFilter()
          clearTagFilter()
        }}
        className='text-sm text-red-500 hover:text-red-700 ml-2 flex items-center'
      >
        <Trash2 className='h-4 w-4 mr-1' />
        清除全部
      </button>
    </div>
  )
}

export default SelectedFilters
