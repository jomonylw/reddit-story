import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  // 核心元数据
  title: 'Reddit 热门故事 | 发现与分享每日精选',
  description:
    '每日为您精选来自 Reddit 的热门故事。探索来自世界各地网友的真实分享，发现最有趣、最感人、最奇葩的精彩内容。',
  icons: {
    icon: '/reddit.svg',
  },

  // Open Graph (OG) 元数据，用于社交媒体分享
  openGraph: {
    title: 'Reddit 热门故事 | 发现与分享每日精选',
    description:
      '每日为您精选来自 Reddit 的热门故事。探索来自世界各地网友的真实分享，发现最有趣、最感人、最奇葩的精彩内容。',
    type: 'website',
    // TODO: 请将下面的 URL 替换为您的网站域名
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: [
      {
        // TODO: 请将下面的图片路径替换为您的网站分享图
        url: '/og-image.png', // 建议尺寸: 1200x630
        width: 1200,
        height: 630,
        alt: 'Reddit 热门故事分享图',
      },
    ],
  },

  // Twitter Card 元数据
  twitter: {
    card: 'summary_large_image',
    title: 'Reddit 热门故事 | 发现与分享每日精选',
    description:
      '每日为您精选来自 Reddit 的热门故事。探索来自世界各地网友的真实分享，发现最有趣、最感人、最奇葩的精彩内容。',
    // TODO: 请将下面的图片路径替换为您的网站分享图
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-4 sm:px-6 lg:px-8 mx-auto min-w-[448px]`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
              document.documentElement.style.setProperty('--scrollbar-width', \`\${scrollbarWidth}px\`);
            `,
          }}
        />
      </body>
    </html>
  )
}
