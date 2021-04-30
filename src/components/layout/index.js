import useStore from '@/helpers/store'
import Head from 'next/head'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Logo from '../Logo'

const Header = () => {
  const title = useStore((s) => s.title)
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

const Layout = ({ children, title }) => {
  const events = useStore((s) => s.events)

  const navigation = [
    { name: 'All Models', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <Header />
      <div className='absolute top-0 left-0 w-screen h-screen min-h-screen overflow-hidden bg-white children'>
        <Disclosure as='nav' className='bg-white border-b border-gray-200'>
          {({ open }) => (
            <>
              <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                  <div className='flex'>
                    <div className='flex items-center flex-shrink-0'>
                      <Logo width='100' />
                    </div>
                    <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'border-indigo-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className='flex items-center -mr-2 sm:hidden'>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XIcon className='block w-6 h-6' aria-hidden='true' />
                      ) : (
                        <MenuIcon
                          className='block w-6 h-6'
                          aria-hidden='true'
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className='sm:hidden'>
                <div className='pt-2 pb-3 space-y-1'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className='py-10'>
          <header>
            <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold leading-tight text-gray-900'>
                {title || 'All Models'}
              </h1>
            </div>
          </header>
          <main>
            <div
              className='relative px-6 mx-auto max-w-7xl lg:px-8'
              {...events}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Layout
