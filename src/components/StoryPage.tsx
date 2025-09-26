'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination'
import StoryCard from '@/components/StoryCard'
import FilterSortPanel from '@/components/FilterSortPanel'
import { Story } from '@/lib/types'
import Header from '@/components/Header'
import StoryCardSkeleton from '@/components/StoryCardSkeleton'

interface StoriesResponse {
  stories: Story[]
  currentPage: number
  totalPages: number
  totalCount: number
}

export default function StoryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [stories, setStories] = useState<Story[]>([])
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  )
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState(
    searchParams.get('sortBy') || 'created_utc',
  )
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
  )
  const [filter, setFilter] = useState(searchParams.get('filter') || 'all')
  const [selectedFlair, setSelectedFlair] = useState<string | null>(
    searchParams.get('flair'),
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    const tags = searchParams.get('tag')
    return tags ? tags.split(',') : []
  })
  const limit = 20

  const fetchStories = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      let url = `/api/stories?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&filter=${filter}`
      if (selectedFlair) {
        url += `&flair=${encodeURIComponent(selectedFlair)}`
      }
      if (selectedTags.length > 0) {
        url += `&tag=${encodeURIComponent(selectedTags.join(','))}`
      }
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch stories')
      }
      const data: StoriesResponse = await response.json()
      setStories(data.stories)
      setTotalPages(data.totalPages)
      setTotalCount(data.totalCount)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [
    currentPage,
    limit,
    sortBy,
    sortOrder,
    filter,
    selectedFlair,
    selectedTags,
  ])

  useEffect(() => {
    const newSearchParams = new URLSearchParams()
    newSearchParams.set('page', String(currentPage))
    newSearchParams.set('sortBy', sortBy)
    newSearchParams.set('sortOrder', sortOrder)
    newSearchParams.set('filter', filter)
    if (selectedFlair) {
      newSearchParams.set('flair', selectedFlair)
    }
    if (selectedTags.length > 0) {
      newSearchParams.set('tag', selectedTags.join(','))
    }
    router.push(`?${newSearchParams.toString()}`)

    fetchStories()
  }, [
    currentPage,
    sortBy,
    sortOrder,
    filter,
    selectedFlair,
    selectedTags,
    router,
    fetchStories,
  ])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSortByChange = (value: string) => {
    setSortBy(value)
    setCurrentPage(1)
  }

  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === 'desc' ? 'asc' : 'desc'))
    setCurrentPage(1)
  }

  const handleFilterChange = (value: string) => {
    setFilter(value)
    setCurrentPage(1)
  }

  const handleTagClick = (tag: string, type: 'flair' | 'tag') => {
    if (type === 'flair') {
      setSelectedFlair((prevFlair) => (prevFlair === tag ? null : tag))
    } else {
      setSelectedTags((prevTags) =>
        prevTags.includes(tag)
          ? prevTags.filter((t) => t !== tag)
          : [...prevTags, tag],
      )
    }
    setCurrentPage(1)
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove))
    setCurrentPage(1)
  }

  const clearFlairFilter = () => {
    setSelectedFlair(null)
    setCurrentPage(1)
  }

  const clearTagFilter = () => {
    setSelectedTags([])
    setCurrentPage(1)
  }

  const filteredStories = stories.filter((story) => {
    const flairMatch = !selectedFlair || story.link_flair_text === selectedFlair
    if (!flairMatch) return false

    if (selectedTags.length === 0) return true
    const storyTags = (story.tags || '').split(',').map((t) => t.trim())
    return selectedTags.every((selectedTag) => storyTags.includes(selectedTag))
  })

  const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages]
    }

    if (currentPage > totalPages - 4) {
      return [
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ]
  }

  const paginationItems = generatePagination(currentPage, totalPages)

  return (
    <div className='container mx-auto py-8 max-w-6xl'>
      <Header />

      <FilterSortPanel
        onSortByChange={handleSortByChange}
        onSortOrderChange={handleSortOrderChange}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
        filterValue={filter}
        selectedFlair={selectedFlair}
        selectedTags={selectedTags}
        clearFlairFilter={clearFlairFilter}
        handleRemoveTag={handleRemoveTag}
        clearTagFilter={clearTagFilter}
      />

      <div className='mb-4 text-sm text-muted-foreground'>
        {loading ? (
          <div className='h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 animate-pulse'></div>
        ) : (
          <p>已找到 {totalCount} 个故事</p>
        )}
      </div>

      <div className='grid grid-cols-1 gap-6 mb-8'>
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <StoryCardSkeleton key={i} />)
        ) : error ? (
          <div className='flex justify-center items-center h-64'>
            <p className='text-red-500'>错误: {error}</p>
          </div>
        ) : (
          filteredStories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onTagClick={handleTagClick}
            />
          ))
        )}
      </div>

      {!loading && totalPages > 1 && (
        <Pagination className='justify-center'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                className={
                  currentPage === 1
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
            {paginationItems.map((item, index) => (
              <PaginationItem key={index}>
                {typeof item === 'number' ? (
                  <PaginationLink
                    onClick={() => handlePageChange(item)}
                    isActive={currentPage === item}
                    className={currentPage === item ? '' : 'cursor-pointer'}
                  >
                    {item}
                  </PaginationLink>
                ) : (
                  <PaginationEllipsis />
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
