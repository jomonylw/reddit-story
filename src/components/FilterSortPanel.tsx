'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
          <label htmlFor='sort-by' className='flex-shrink-0 w-12'>
            排序
          </label>
          <Select onValueChange={onSortByChange} value={sortBy}>
            <SelectTrigger className='flex-1 md:w-[150px]'>
              <SelectValue placeholder='选择排序' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='created_utc'>创建时间</SelectItem>
              <SelectItem value='total_score'>AI 评分</SelectItem>
              <SelectItem value='score'>Reddit 分数</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='outline' size='icon' onClick={onSortOrderChange}>
            {sortOrder === 'desc' ? (
              <ArrowDownWideNarrow className='h-4 w-4' />
            ) : (
              <ArrowDownNarrowWide className='h-4 w-4' />
            )}
          </Button>
        </div>
        <div className='flex items-center space-x-2 flex-1 md:flex-none w-full md:w-auto'>
          <label htmlFor='filter-by-time' className='flex-shrink-0 w-12'>
            筛选
          </label>
          <Select onValueChange={onFilterChange} value={filterValue}>
            <SelectTrigger className='flex-1 md:w-[180px]'>
              <SelectValue placeholder='选择时间范围' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>全部</SelectItem>
              <SelectItem value='last_year'>近一年</SelectItem>
              <SelectItem value='last_month'>近一月</SelectItem>
              <SelectItem value='last_week'>近一周</SelectItem>
            </SelectContent>
          </Select>
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
