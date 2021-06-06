import React from 'react';

// components
import NoticeListItem from '@components/Notice';
import Dashboard from '@components/layout/Dashboard';
import BreadCrumb from '@components/ui/BreadCrumb';

// libraries
import getAllNotices from '@lib/claNotice/getAllNotices';

// icons
import Spinner from '@components/icons/Spinner';

const BreadPages = [
  {
    name: 'View-Noti',
    href: '/view-noti',
    current: true,
  },
];

const ViewNoti = () => {
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
        {notices}
      </div>
    );

  return (
    <div className="pt-4 sm:pt-8 md:pt-12 pb-32 px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto ">
      <BreadCrumb pages={BreadPages} className="mb-8" />
      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-3xl font-semibold">공지사항</h3>
      </div>
      {notices && (
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
      )}
    </div>
  );
};

ViewNoti.Layout = Dashboard;
export default ViewNoti;
