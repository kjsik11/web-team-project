import React, { Fragment, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MenuIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline';

// components
import { useUI } from '@components/ui/context';
import Modal from '@components/ui/Modal';
import Notification from '@components/ui/Notification';
import Avatar from '@components/ui/Avatar';
import Link from '@components/ui/Link';

// librarise
import Button from '@components/ui/Button';
import { BookOpenIcon } from '@heroicons/react/solid';

const sidebarNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon, key: '/home' },
  {
    name: 'Information',
    href: '/info',
    icon: BookOpenIcon,
    key: 'info',
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
    icon: CalendarIcon,
    key: 'portfolio',
  },
  { name: 'Notice', href: '/notice', icon: ViewGridIcon, key: 'notice' },
  { name: 'Settings', href: '/settings', icon: CogIcon, key: 'settings' },
];
const userNavigation = [
  // { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '/' },
];

interface Props {
  sidebar?: React.ReactNode;
}

const Dashboard: React.FC<Props> = ({ sidebar, children }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const {
    modalFlag,
    modalContent,
    notiFlag,
    closeNoti,
    notiContent,
    showNoti,
  } = useUI();

  return (
    <>
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        {/* Narrow sidebar */}
        <div className="hidden w-28 bg-lightBlue-700 overflow-y-auto md:block">
          <div className="w-full py-6 flex flex-col items-center h-full">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl text-white">
                LOGO
              </Link>
              {/* <img className="h-8 w-auto" src="/logo.png" alt="logo" /> */}
            </div>
            <div className="flex-1 mt-6 w-full px-2 space-y-1 flex flex-col items-center">
              {sidebarNavigation
                .map((item) => ({
                  ...item,
                  current: router.asPath.includes(item.key),
                }))
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      item.current &&
                        !(
                          (item.key === 'dataset' || item.key === 'model') &&
                          router.asPath.includes('marketplace')
                        )
                        ? 'bg-lightBlue-800 text-white'
                        : 'text-lightBlue-100 hover:bg-lightBlue-800 hover:text-white',
                      'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={cn(
                        item.current &&
                          !(
                            (item.key === 'dataset' || item.key === 'model') &&
                            router.asPath.includes('marketplace')
                          )
                          ? 'text-white'
                          : 'text-lightBlue-300 group-hover:text-white',
                        'h-6 w-6',
                      )}
                      aria-hidden="true"
                    />
                    <span className="mt-2">{item.name}</span>
                  </Link>
                ))}
              <div className="flex-grow" aria-hidden="true" />
              <div className="flex flex-col items-center text-xs text-lightBlue-100 font-medium">
                <Avatar size="md" src={undefined} />
                <span className="mt-2">{'test user'}</span>
              </div>
              <div className="pt-2">
                <NextLink href="#">
                  <Button size="sm" color="white">
                    <span className="text-xs text-lightBlue-600">Signout</span>
                  </Button>
                </NextLink>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            static
            className="md:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative max-w-xs w-full bg-lightBlue-700 pt-5 pb-4 flex-1 flex flex-col">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-1 right-0 -mr-14 p-1">
                      <button
                        type="button"
                        className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 px-4 flex items-center">
                    <Link href="/" className="text-xl text-white">
                      LOGO
                    </Link>
                  </div>
                  <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                    <nav className="h-full flex flex-col justify-between">
                      <div className="space-y-1">
                        {sidebarNavigation
                          .map((item) => ({
                            ...item,
                            current: router.asPath.includes(item.key),
                          }))
                          .map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={cn(
                                item.current
                                  ? 'bg-lightBlue-800 text-white'
                                  : 'text-lightBlue-100 hover:bg-lightBlue-800 hover:text-white',
                                'group py-2 px-3 rounded-md flex items-center text-sm font-medium',
                              )}
                              aria-current={item.current ? 'page' : undefined}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <item.icon
                                className={cn(
                                  item.current
                                    ? 'text-white'
                                    : 'text-lightBlue-300 group-hover:text-white',
                                  'mr-3 h-6 w-6',
                                )}
                                aria-hidden="true"
                              />
                              <span>{item.name}</span>
                            </Link>
                          ))}
                      </div>
                      <div className="py-2 px-3 flex items-center text-sm font-medium text-lightBlue-100">
                        <Avatar className="mr-3" size="sm" src={undefined} />
                        <span>{'test user'}</span>
                        <div className="flex-grow" aria-hidden="true" />
                        <Link href="/" className="hover:opacity-60">
                          Signout
                        </Link>
                      </div>
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="w-full md:hidden">
            <div className="relative z-10 flex-shrink-0 h-14 bg-white border-b border-gray-200 shadow-sm flex justify-between">
              <button
                type="button"
                className="rounded-full px-4 text-gray-500 md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              {/* LOGO AREA */}
              <span className="absolute transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-serif font-medium">
                LOGO
              </span>
              <div className="mr-4 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative flex-shrink-0">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm">
                          <span className="sr-only">Open user menu</span>
                          <Avatar size="sm" src={undefined} />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  href={item.href}
                                  className={cn(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className="flex-1 flex items-stretch overflow-auto">
            {/* Secondary column (hidden on smaller screens) */}
            <aside
              className={cn(
                'hidden w-52 bg-white border-r border-gray-200 overflow-y-auto',
                {
                  'lg:block': !!sidebar,
                },
              )}
            >
              {sidebar}
            </aside>
            <main className="flex-1 overflow-y-auto">
              {/* Primary column */}
              {children}
            </main>
          </div>
        </div>
      </div>
      <Modal show={modalFlag} {...modalContent} />
      <Notification
        show={notiFlag}
        close={() => closeNoti()}
        variant={notiContent.variant}
        title={notiContent.title}
        content={notiContent.content}
      />
    </>
  );
};

export default Dashboard;
