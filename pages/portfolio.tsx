import React from 'react';
import Dashboard from '@components/layout/Dashboard';
import BreadCrumb from '@components/ui/BreadCrumb';
import Link from '@components/ui/Link';

const BreadPages = [
  {
    name: 'Portfolio',
    href: '/portfolio',
    current: true,
  },
];

const posts = [
  {
    title: '교회 사이트',
    href: 'https://tlcommunity.co.kr/',
    category: { name: 'church', href: '#' },
    description: '신세를 진 교회 관련하여 만들어준 사이트',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl: '/images/preview/church.png',
  },
  {
    title: 'AI관련 스타트업 발표 사이트',
    href: 'https://aiport.jongsik.site/',
    category: { name: 'aiport', href: '#' },
    description:
      '지인이 창업한 회사 발표 관련하여 만들어 준 프로토타입 사이트 (로그인 해야 확인 가능)',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    imageUrl: '/images/preview/aiport.png',
  },
  {
    title: '회사 사이트',
    href: 'https://collected.ondp.app/',
    category: { name: 'collected', href: '#' },
    description: '창업 아이템 관련하여 개발한 회사 사이트',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl: '/images/preview/collected.png',
  },
];

const PortfolioPage = () => {
  return (
    <div className="pt-4 sm:pt-8 md:pt-12 pb-32 px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto ">
      <BreadCrumb pages={BreadPages} className="mb-8" />

      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-3xl font-semibold">만든 사이트들</h3>
      </div>
      <div className="pt-8">
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {posts.map((post) => (
            <Link
              href={post.href}
              key={post.title}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={post.imageUrl}
                  alt=""
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-indigo-600">
                    <p className="hover:underline">{post.category.name}</p>
                  </div>
                  <div className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {post.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

PortfolioPage.Layout = Dashboard;
export default PortfolioPage;
