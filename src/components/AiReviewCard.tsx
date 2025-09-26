'use client'

import { useState } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Story } from '@/lib/types'
import { ChevronDown } from 'lucide-react'
import Score from './Score'

interface AiReviewCardProps {
  story: Story
}

export default function AiReviewCard({ story }: AiReviewCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const data = [
    {
      subject: '原创性',
      score: story.originality_score,
      fullMark: 10,
      reason: story.originality_reason,
    },
    {
      subject: '情节',
      score: story.plot_score,
      fullMark: 10,
      reason: story.plot_reason,
    },
    {
      subject: '人物',
      score: story.character_score,
      fullMark: 10,
      reason: story.character_reason,
    },
    {
      subject: '文笔',
      score: story.prose_score,
      fullMark: 10,
      reason: story.prose_reason,
    },
    {
      subject: '情感冲击力',
      score: story.emotional_impact_score,
      fullMark: 10,
      reason: story.emotional_impact_reason,
    },
  ]

  interface Payload {
    name: string
    value: number
    payload: {
      subject: string
      score: number
      fullMark: number
      reason: string
    }
  }

  interface CustomTooltipProps {
    active?: boolean
    payload?: Payload[]
    label?: string
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-background border p-2 rounded shadow-lg max-w-xs'>
          <p className='label font-bold'>{`${label} : ${payload[0].value}`}</p>
          <p className='intro text-sm text-muted-foreground'>
            {payload[0].payload.reason}
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <div className='border rounded-lg'>
      <div className='p-4'>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
        >
          <h4 className='font-semibold flex items-center space-x-2'>
            {/* AI点评 */}
            <Score label='AI 评分' score={story.total_score} size='large' />
          </h4>
          <div className='flex items-center'>
            <span className='text-sm text-muted-foreground mr-2'>
              {isOpen ? '收起' : '展开'}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
        {story.one_line_summary && (
          <p className='text-sm font-semibold mt-2'>{story.one_line_summary}</p>
        )}
        {story.review && (
          <p className='text-sm text-muted-foreground mt-1 italic'>
            &ldquo;{story.review}&rdquo;
          </p>
        )}
      </div>
      {isOpen && (
        <div className='p-4 border-t'>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='h-64'>
              <ResponsiveContainer width='100%' height='100%'>
                <RadarChart cx='50%' cy='50%' outerRadius='80%' data={data}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey='subject' />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 10]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    name='分数'
                    dataKey='score'
                    stroke='#8884d8'
                    fill='#8884d8'
                    fillOpacity={0.6}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className='text-sm space-y-2'>
              <div className='flex items-center space-x-2'>
                <Score label='原创性' score={story.originality_score} />
                {/* <span className="text-muted-foreground">-</span> */}
                <span className='text-muted-foreground flex-1'>
                  {story.originality_reason}
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <Score label='情节' score={story.plot_score} />
                {/* <span className="text-muted-foreground">-</span> */}
                <span className='text-muted-foreground flex-1'>
                  {story.plot_reason}
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <Score label='人物' score={story.character_score} />
                {/* <span className="text-muted-foreground">-</span> */}
                <span className='text-muted-foreground flex-1'>
                  {story.character_reason}
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <Score label='文笔' score={story.prose_score} />
                {/* <span className="text-muted-foreground">-</span> */}
                <span className='text-muted-foreground flex-1'>
                  {story.prose_reason}
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <Score
                  label='情感冲击力'
                  score={story.emotional_impact_score}
                />
                {/* <span className="text-muted-foreground">-</span> */}
                <span className='text-muted-foreground flex-1'>
                  {story.emotional_impact_reason}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
