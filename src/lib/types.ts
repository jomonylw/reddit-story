export interface Story {
  id: string
  title: string
  selftext: string
  selftext_html: string
  permalink: string
  is_self: number
  link_flair_text: string | null
  link_flair_type: string
  is_original_content: number
  over_18: number
  upvote_ratio: number
  num_comments: number
  score: number
  thumbnail: string | null
  created_utc: string
  title_cn: string
  selftext_cn: string
  selftext_html_cn: string
  tags: string
  total_score: number
  one_line_summary: string
  review: string
  originality_score: number
  originality_reason: string
  plot_score: number
  plot_reason: string
  character_score: number
  character_reason: string
  prose_score: number
  prose_reason: string
  emotional_impact_score: number
  emotional_impact_reason: string
  model_version: string
  step1_completed: number
  step2_completed: number
  step3_completed: number
  rank: number
  created_at: string
  updated_at: string
}
