import React from 'react'

interface ScoreProps {
  score: number
  label?: string
  size?: 'small' | 'large'
  color?: 'gray' | 'blue' | 'green' | 'red' | 'orange' | 'purple'
}

const colorClasses = {
  gray: {
    bgLabel: 'bg-gray-200 dark:bg-gray-700',
    textLabel: 'text-gray-800 dark:text-gray-200',
    bgScore: 'bg-gray-300 dark:bg-gray-600',
    textScore: 'text-gray-900 dark:text-gray-100',
  },
  blue: {
    bgLabel: 'bg-blue-200 dark:bg-blue-700',
    textLabel: 'text-blue-800 dark:text-blue-200',
    bgScore: 'bg-blue-300 dark:bg-blue-600',
    textScore: 'text-blue-900 dark:text-blue-100',
  },
  green: {
    bgLabel: 'bg-green-200 dark:bg-green-700',
    textLabel: 'text-green-800 dark:text-green-200',
    bgScore: 'bg-green-300 dark:bg-green-600',
    textScore: 'text-green-900 dark:text-green-100',
  },
  red: {
    bgLabel: 'bg-red-200 dark:bg-red-700',
    textLabel: 'text-red-800 dark:text-red-200',
    bgScore: 'bg-red-300 dark:bg-red-600',
    textScore: 'text-red-900 dark:text-red-100',
  },
  orange: {
    bgLabel: 'bg-orange-200 dark:bg-orange-700/60',
    textLabel: 'text-orange-800 dark:text-orange-200',
    bgScore: 'bg-orange-300 dark:bg-orange-600/60',
    textScore: 'text-orange-900 dark:text-orange-100',
  },
  purple: {
    bgLabel: 'bg-purple-200 dark:bg-purple-700',
    textLabel: 'text-purple-800 dark:text-purple-200',
    bgScore: 'bg-purple-300 dark:bg-purple-600',
    textScore: 'text-purple-900 dark:text-purple-100',
  },
}

const Score: React.FC<ScoreProps> = ({
  score,
  label,
  size = 'small',
  color = 'gray',
}) => {
  const textSize = size === 'large' ? 'text-sm' : 'text-xs'
  const padding = size === 'large' ? 'px-3 py-1' : 'px-2 py-0.5'
  const { bgLabel, textLabel, bgScore, textScore } = colorClasses[color]

  return (
    <div className={`inline-flex rounded-md overflow-hidden ${textSize}`}>
      {label && (
        <span className={`${padding} ${bgLabel} ${textLabel} font-medium`}>
          {label}
        </span>
      )}
      <span className={`${padding} ${bgScore} ${textScore} font-bold`}>
        {score}
      </span>
    </div>
  )
}

export default Score
