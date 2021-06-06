import React from 'react';
import NextImage from 'next/image';
import { DocumentTextIcon } from '@heroicons/react/outline';
import { ViewGridIcon } from '@heroicons/react/solid';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';

const sections = [
  {
    title: 'Event Log',
    picture: '/icon/eventlog.png',
    links: [
      {
        name: 'Analysis',
        href: '/analysis/eventlog',
        icon: ViewGridIcon,
      },
      {
        name: 'Docs',
        href: '/docs/eventlog',
        icon: DocumentTextIcon,
      },
    ],
  },
  {
    title: 'Prefetch',
    picture: '/icon/prefetch.png',
    links: [
      {
        name: 'Analysis',
        href: '/analysis/prefetch',
        icon: ViewGridIcon,
      },
      {
        name: 'Docs',
        href: '/docs/prefetch',
        icon: DocumentTextIcon,
      },
    ],
  },
  {
    title: 'JumpList',
    picture: '/icon/jumplist.png',
    links: [
      {
        name: 'Analysis',
        href: '/analysis/jumplist',
        icon: ViewGridIcon,
      },
      {
        name: 'Docs',
        href: '/docs/jumplist',
        icon: DocumentTextIcon,
      },
    ],
  },
  {
    title: 'LNK',
    picture: '/icon/lnk.png',
    links: [
      {
        name: 'Analysis',
        href: '/analysis/lnk',
        icon: ViewGridIcon,
      },
      {
        name: 'Docs',
        href: '/docs/lnk',
        icon: DocumentTextIcon,
      },
    ],
  },
];

const DashboardPage = () => {
  return (
    <div className="pt-4 sm:pt-8 md:pt-12 lg:pt-16 pb-32 px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto ">
      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-4xl font-medium text-gray-900">My Web Project</h3>
      </div>
      <div className="pt-24">
        <div className="max-w-md mx-auto space-y-20 grid gap-5 lg:space-y-0 lg:grid-cols-2 lg:max-w-screen-md xl:gap-16">
          {sections.map((section) => (
            <div
              key={section.title}
              className="relative flex flex-col rounded-lg border border-black border-opacity-10 shadow-lg p-4 py-8"
            >
              <span className="absolute -top-12 right-4 rounded-full border border-gray-300 bg-gray-50 shadow p-3 overflow-hidden">
                <NextImage
                  src={section.picture}
                  alt=""
                  layout="fixed"
                  width={64}
                  height={64}
                  sizes="64px"
                />
              </span>
              <h4 className="text-2xl font-semibold px-3">{section.title}</h4>
              <nav className="mt-8 space-y-1">
                {section.links.map(({ name, href, ...item }) => (
                  <Link
                    key={name}
                    href={href}
                    className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <item.icon
                      className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      aria-hidden="true"
                    />
                    <span className="truncate">{name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

DashboardPage.Layout = Dashboard;
export default DashboardPage;
