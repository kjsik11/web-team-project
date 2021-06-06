import React from 'react';
import cn from 'classnames';

// components
import Dashboard from '@components/layout/Dashboard';
import BreadCrumb from '@components/ui/BreadCrumb';

// icons
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import { ReceiptRefundIcon } from '@heroicons/react/solid';

const BreadPages = [
  {
    name: 'information',
    href: '/info',
    current: true,
  },
];

const actions = [
  {
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org/',
    icon: ClockIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
    description:
      '타입스크립트는 자바스크립트에 타입을 부여한 언어이며 MS에 의해 개발/관리되고 있는 오픈소스 프로그래밍 언어이다.',
  },
  {
    title: 'MongoDB',
    href: 'https://docs.mongodb.com/',
    icon: BadgeCheckIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
    description: '',
  },
  {
    title: 'Vercel',
    href: 'https://vercel.com',
    icon: UsersIcon,
    iconForeground: 'text-light-blue-700',
    iconBackground: 'bg-light-blue-50',
    description: '',
  },
  {
    title: 'Tailwind',
    href: 'https://tailwindcss.com/docs',
    icon: CashIcon,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
    description: '',
  },
  {
    title: 'git',
    href: 'https://github.com/',
    icon: ReceiptRefundIcon,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
    description: '',
  },
  {
    title: 'NextJS',
    href: 'https://nextjs.org/',
    icon: AcademicCapIcon,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
    description: '',
  },
];

const portfolio = () => {
  return (
    <div className="pt-4 sm:pt-8 md:pt-12 pb-32 px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto ">
      <BreadCrumb pages={BreadPages} className="mb-8" />

      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-3xl font-semibold">사용된 기술</h3>
      </div>
      <div className="pt-8">
        <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
          {actions.map((action, actionIdx) => (
            <div
              key={action.title}
              className={cn(
                actionIdx === 0
                  ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                  : '',
                actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                actionIdx === actions.length - 1
                  ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                  : '',
                'relative group bg-white p-6 hover:ring-2 hover:ring-inset hover:ring-lightBlue-500',
              )}
            >
              <div>
                <span
                  className={cn(
                    action.iconBackground,
                    action.iconForeground,
                    'rounded-lg inline-flex p-3 ring-4 ring-white',
                  )}
                >
                  <action.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <a
                    target="blank"
                    href={action.href}
                    className="hover:outline-none"
                  >
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    {action.title}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {action.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

portfolio.Layout = Dashboard;
export default portfolio;
