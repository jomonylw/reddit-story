import { NextRequest, NextResponse } from 'next/server'
import { getStories, getStoryCount } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = parseInt(searchParams.get('limit') || '20')
    const sortBy = searchParams.get('sortBy') || 'created_utc'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const filter = searchParams.get('filter') || 'all'
    const flair = searchParams.get('flair') || null
    const tagsParam = searchParams.get('tag')
    const tags = tagsParam ? tagsParam.split(',') : null

    const [stories, count] = await Promise.all([
      getStories(page, limit, sortBy, sortOrder, filter, flair, tags),
      getStoryCount(filter, flair, tags),
    ])

    const totalPages = Math.ceil(count / limit)

    return NextResponse.json({
      stories,
      currentPage: page,
      totalPages,
      totalCount: count,
    })
  } catch (error) {
    console.error('Error fetching stories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 },
    )
  }
}
