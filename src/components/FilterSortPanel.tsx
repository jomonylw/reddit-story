'use client'

import CustomSelect from '@/components/ui/CustomSelect'
import { Button } from '@/components/ui/button'
import { ArrowDownWideNarrow, ArrowDownNarrowWide } from 'lucide-react'
import SelectedFilters from './SelectedFilters'

interface FilterSortPanelProps {
  onSortByChange: (value: string) => void
  onSortOrderChange: () => void
  onFilterChange: (value: string) => void
  sortBy: string
  sortOrder: 'asc' | 'desc'
  filterValue: string
  selectedFlair: string | null
  selectedTags: string[]
  clearFlairFilter: () => void
  handleRemoveTag: (tag: string) => void
  clearTagFilter: () => void
}

export default function FilterSortPanel({
  onSortByChange,
  onSortOrderChange,
  onFilterChange,
  sortBy,
  sortOrder,
  filterValue,
  selectedFlair,
  selectedTags,
  clearFlairFilter,
  handleRemoveTag,
  clearTagFilter,
}: FilterSortPanelProps) {
  return (
    <div className='mb-4 p-4 bg-muted text-muted-foreground rounded-lg'>
      <div className='flex flex-col md:flex-row gap-4 mb-2 items-start md:items-center md:justify-between'>
        <div className='flex items-center space-x-2 flex-1 md:flex-none w-full md:w-auto'>
          <label htmlFor='sort-by' className='flex-shrink-0 w-12 font-bold'>
            排序
          </label>
          <CustomSelect
            value={sortBy}
            onChange={onSortByChange}
            options={[
              { value: 'created_utc', label: '创建时间' },
              { value: 'total_score', label: 'AI 评分' },
              { value: 'score', label: 'Reddit 分数' },
            ]}
            placeholder='选择排序'
            triggerClassName='flex-1 md:w-[150px]'
          />
          <Button variant='outline' size='icon' onClick={onSortOrderChange}>
            {sortOrder === 'desc' ? (
              <ArrowDownWideNarrow className='h-4 w-4' />
            ) : (
              <ArrowDownNarrowWide className='h-4 w-4' />
            )}
          </Button>
        </div>
        <div className='flex items-center space-x-2 flex-1 md:flex-none w-full md:w-auto'>
          <label htmlFor='filter-by-time' className='flex-shrink-0 w-12 font-bold'>
            筛选
          </label>
          <CustomSelect
            value={filterValue}
            onChange={onFilterChange}
            options={[
              { value: 'all', label: '全部' },
              { value: 'last_year', label: '近一年' },
              { value: 'last_month', label: '近一月' },
              { value: 'last_week', label: '近一周' },
            ]}
            placeholder='选择时间范围'
            triggerClassName='flex-1 md:w-[180px]'
          />
        </div>
      </div>
      <SelectedFilters
        selectedFlair={selectedFlair}
        selectedTags={selectedTags}
        clearFlairFilter={clearFlairFilter}
        handleRemoveTag={handleRemoveTag}
        clearTagFilter={clearTagFilter}
      />
    </div>
  )
}
