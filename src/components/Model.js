import React from 'react'
import Link from 'next/link'
import Tippy from '@tippyjs/react'
import useStore from '@/helpers/store'

const Model = (model) => {
  const user = useStore((state) => state.user)
  const toggleFavorite = useStore((state) => state.toggleFavorite)
  return (
    <li key={model.image} className='relative'>
      <Link
        className='absolute inset-0 focus:outline-none'
        href={`/model/${model.url}`}
      >
        <a>
          <div className='relative'>
            <span className='absolute right-0 z-10 p-2 text-sm text-gray-800 bg-gray-100 rounded-tl-none rounded-tr-lg rounded-br-none rounded-bl-md opacity-85'>
              {model.info.category}
            </span>{' '}
            <div className='block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'>
              <img
                src={`https://api.market.pmnd.rs/${model.image}`}
                alt=''
                className='object-cover pointer-events-none group-hover:opacity-75'
              />
            </div>
          </div>
          <div className='flex items-end justify-between'>
            <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none'>
              {model.info?.name}
            </p>
            <button
              className='z-90'
              onClick={async (e) => {
                e.preventDefault()
                toggleFavorite(model, 'models')
              }}
            >
              {user?.profile?.favorites &&
              user.profile.favorites.includes(`models/${model.url}`) ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-red-600'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 text-red-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              )}
            </button>
          </div>
          <p className='block text-sm font-medium text-gray-500'>
            {model.highPoly && (
              <Tippy content='Large model'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 mr-2 text-yellow-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </Tippy>
            )}
            {model.size}
          </p>
        </a>
      </Link>
    </li>
  )
}

export default Model
