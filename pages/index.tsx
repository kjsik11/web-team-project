import React from 'react';
import NextImage from 'next/image';
import { DocumentTextIcon } from '@heroicons/react/outline';
import { ViewGridIcon } from '@heroicons/react/solid';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';
import BreadCrumb from '@components/ui/BreadCrumb';

const BreadPages = [] as {
  name: string;
  href: string;
  current: boolean;
}[];

const DashboardPage = () => {
  return (
    <div className="pt-4 sm:pt-8 md:pt-12 lg:pt-16 pb-32 px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto ">
      <BreadCrumb pages={BreadPages} className="mb-8" />

      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-4xl font-medium text-gray-900">My Web Project</h3>
      </div>
      <div className="pt-24">
        <div className="max-w-md mx-auto space-y-20 grid gap-5 lg:space-y-0 lg:grid-cols-2 lg:max-w-screen-md xl:gap-16">
          <p>발표 영상 들어갈 자리</p>
        </div>
      </div>
    </div>
  );
};

DashboardPage.Layout = Dashboard;
export default DashboardPage;
