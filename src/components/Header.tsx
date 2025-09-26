import Image from 'next/image'
import { ThemeToggle } from './ThemeToggle'

const Header = () => {
  return (
    <div className='flex items-center justify-between mb-8'>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href='/'>
        <div className='flex items-center'>
          <Image
            src='/reddit.svg'
            alt='Reddit Logo'
            width={40}
            height={40}
            className='mr-2'
          />
          <h1 className='text-3xl font-bold'>Reddit 故事会</h1>
        </div>
      </a>
      <ThemeToggle />
    </div>
  )
}

export default Header
