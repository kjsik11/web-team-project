import React from 'react';

// components
import Dashboard from '@components/layout/Dashboard';
import BreadCrumb from '@components/ui/BreadCrumb';

const BreadPages = [] as {
  name: string;
  href: string;
  current: boolean;
}[];

const DashboardPage = () => {
  return (
    <div className="pt-4 sm:pt-8 md:py-12 lg:py-16 px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto h-full">
      <BreadCrumb pages={BreadPages} className="mb-8" />

      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-4xl font-medium text-gray-900">My Web Project</h3>
      </div>

      <div className="relative my-16 h-full md:mt-8 w-full rounded-md overflow-hidden">
        <iframe
          className="w-4/5 h-4/5 absolute inset-0 mx-auto"
          frameBorder="0"
          allow="encrypted-media"
          allowFullScreen
          title="youtube"
          src="https://www.youtube.com/embed/2KCURM6Mwsw"
        />
      </div>
    </div>
  );
};

DashboardPage.Layout = Dashboard;
export default DashboardPage;
