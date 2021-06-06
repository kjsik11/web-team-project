import React from 'react';

// components
// import { Head } from '@components/core';

// libraries

// icons
import Spinner from '@components/icons/Spinner';
import Dashboard from '@components/layout/Dashboard';
import getAllNotices from '@lib/claNotice/getAllNotices';
import NoticeListItem from '@components/Notice';
import BreadCrumb from '@components/ui/BreadCrumb';

const BreadPages = [
  {
    name: 'View-Noti',
    href: '/view-noti',
    current: true,
  },
];

// TODO: SWR
const Notice = () => {
  const [notices, setNotices] = React.useState<NoticeInfo[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    getAllNotices()
      .then((notices) => {
        setNotices(notices);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>{error}</p>;

  if (notices === null)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );

  return (
    <div className="pt-4 sm:pt-8 md:pt-12 pb-32 px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto ">
      <BreadCrumb pages={BreadPages} className="mb-8" />
      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-3xl font-semibold">공지사항</h3>
      </div>
      <div className="max-w-3xl mx-auto mt-8">
        {notices.length === 0 ? (
          <div>공지사항이 없습니다.</div>
        ) : (
          <ul>
            {notices.map((notice) => (
              <li key={`notice-${notice._id}`}>
                <NoticeListItem noticeItem={notice} className="mb-6" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Notice.Layout = Dashboard;
Notice.title = '공지사항';
export default Notice;
