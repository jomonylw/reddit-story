import { createClient } from '@libsql/client/web'
import { Story } from './types'

// By explicitly setting `protocol: "http"`, we force the client to use the
// pure JavaScript fetch-based implementation, completely avoiding any native
// modules or WebSocket issues, thus ensuring maximum compatibility.
const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

export async function getStories(
  page: number = 1,
  limit: number = 20,
  sortBy: string = 'created_utc',
  sortOrder: string = 'desc',
  filter: string = 'all',
  flair: string | null = null,
  tags: string[] | null = null,
): Promise<Story[]> {
  const offset = (page - 1) * limit

  let fromClause = 'FROM story s'
  let whereClause =
    'WHERE s.step1_completed = 1 AND s.step2_completed = 1 AND s.step3_completed = 1'
  const args: (string | number)[] = []
  let groupByClause = ''
  let havingClause = ''

  if (flair) {
    whereClause += ' AND s.link_flair_text = ?'
    args.push(flair)
  }

  if (tags && tags.length > 0) {
    fromClause += ' JOIN story_tag st ON s.id = st.story_id'
    const placeholders = tags.map(() => '?').join(',')
    whereClause += ` AND st.tag_name IN (${placeholders})`
    args.push(...tags)
    groupByClause = 'GROUP BY s.id'
    havingClause = 'HAVING COUNT(DISTINCT st.tag_name) = ?'
  }

  if (filter !== 'all') {
    const now = new Date()
    let startDate: Date | null = null
    if (filter === 'last_year') {
      startDate = new Date(now)
      startDate.setFullYear(startDate.getFullYear() - 1)
    } else if (filter === 'last_month') {
      startDate = new Date(now)
      startDate.setMonth(startDate.getMonth() - 1)
    } else if (filter === 'last_week') {
      startDate = new Date(now)
      startDate.setDate(startDate.getDate() - 7)
    }
    if (startDate) {
      whereClause += ' AND created_utc >= ?'
      // Format to 'YYYY-MM-DD HH:MM:SS'
      args.push(startDate.toISOString().slice(0, 19).replace('T', ' '))
    }
  }

  if (tags && tags.length > 0) {
    args.push(tags.length)
  }

  const allowedSortFields = [
    'total_score',
    'created_utc',
    'num_comments',
    'score',
  ]
  const allowedSortOrders = ['asc', 'desc']

  const finalSortBy = allowedSortFields.includes(sortBy)
    ? sortBy
    : 'created_utc'
  const finalSortOrder = allowedSortOrders.includes(sortOrder)
    ? sortOrder
    : 'desc'

  const orderBy = `ORDER BY ${finalSortBy} ${finalSortOrder.toUpperCase()}, s.id ${finalSortOrder.toUpperCase()}`

  const sql = `SELECT s.* ${fromClause} ${whereClause} ${groupByClause} ${havingClause} ${orderBy} LIMIT ? OFFSET ?`
  args.push(limit, offset)

  const result = await db.execute({ sql, args })
  return result.rows as unknown as Story[]
}

export async function getStoryCount(
  filter: string = 'all',
  flair: string | null = null,
  tags: string[] | null = null,
): Promise<number> {
  let fromClause = 'FROM story s'
  let whereClause =
    'WHERE s.step1_completed = 1 AND s.step2_completed = 1 AND s.step3_completed = 1'
  const args: (string | number)[] = []
  let groupByClause = ''
  let havingClause = ''

  if (flair) {
    whereClause += ' AND s.link_flair_text = ?'
    args.push(flair)
  }

  if (tags && tags.length > 0) {
    fromClause += ' JOIN story_tag st ON s.id = st.story_id'
    const placeholders = tags.map(() => '?').join(',')
    whereClause += ` AND st.tag_name IN (${placeholders})`
    args.push(...tags)
    groupByClause = 'GROUP BY s.id'
    havingClause = 'HAVING COUNT(DISTINCT st.tag_name) = ?'
  }

  if (filter !== 'all') {
    const now = new Date()
    let startDate: Date | null = null
    if (filter === 'last_year') {
      startDate = new Date(now)
      startDate.setFullYear(startDate.getFullYear() - 1)
    } else if (filter === 'last_month') {
      startDate = new Date(now)
      startDate.setMonth(startDate.getMonth() - 1)
    } else if (filter === 'last_week') {
      startDate = new Date(now)
      startDate.setDate(startDate.getDate() - 7)
    }
    if (startDate) {
      whereClause += ' AND created_utc >= ?'
      args.push(startDate.toISOString().slice(0, 19).replace('T', ' '))
    }
  }

  if (tags && tags.length > 0) {
    args.push(tags.length)
  }

  // When grouping, we need to count the distinct groups to get the correct total.
  const countSql = groupByClause
    ? `SELECT COUNT(*) as count FROM (SELECT s.id ${fromClause} ${whereClause} ${groupByClause} ${havingClause}) AS subquery`
    : `SELECT COUNT(s.id) as count ${fromClause} ${whereClause}`

  const result = await db.execute({ sql: countSql, args })
  return Number(result.rows[0].count)
}

export default db
