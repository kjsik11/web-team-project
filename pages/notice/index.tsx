import React from 'react';
import cn from 'classnames';

import BreadCrumb from '@components/ui/BreadCrumb';
import Dashboard from '@components/layout/Dashboard';
import Button from '@components/ui/Button';
import Notification from '@components/ui/Notification';
import Modal from '@components/ui/Modal';
import Spinner from '@components/icons/Spinner';
import getAllNotices from '@lib/notice/getAllNotices';
import deleteNoticeById from '@lib/notice/deleteNoticeById';
import formatDate from '@utils/formatDate';

const BreadPages = [
  {
    name: 'Notice',
    href: '/notice',
    current: true,
  },
];

const NoticePage = () => {
  const [noticeList, setNoticeList] = React.useState<NoticeInfo[] | null>(null);
  const [noticeId, setNoticeId] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [notiFlags, setNotiFlags] = React.useState<{
    success: boolean;
    fail: boolean;
  }>({ success: false, fail: false });
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const fetchData = React.useCallback(() => {
    getAllNotices()
      .then((notices) => {
        setNoticeList(notices);
      })
      .catch((err) => setError(err.message));
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete: (noticeId: string) => Promise<void> = React.useCallback(
    async (noticeId) => {
      setLoading(true);
      try {
        await deleteNoticeById(noticeId);
        fetchData();

        setNotiFlags({ ...notiFlags, success: true });
      } catch (err) {
        setErrorMessage(err.message);
        setNotiFlags({ ...notiFlags, fail: true });
      } finally {
        setLoading(false);
      }
    },
    [notiFlags, fetchData],
  );

  if (error !== null) return <div>{error}</div>;

  if (noticeList === null)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );

  return (
    <div className="pt-4 sm:pt-8 md:pt-12 pb-32 px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto ">
      <div>
        <BreadCrumb pages={BreadPages} className="mb-8" />
      </div>
      <div className="flex flex-col p-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <a href="/notice/upload">
              <Button className="mb-4">공지사항 추가</Button>
            </a>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="text-center">
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      제목
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      작성일
                    </th>
                    <th scope="col" />
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {noticeList.map((notice, idx) => (
                    <tr key={`${notice._id}-${idx}`} className="text-center">
                      <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {notice.title}
                      </td>
                      <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatDate(notice.created, { withDetails: true })}
                      </td>
                      <td className="px-6 py-4 w-10 whitespace-nowrap text-sm text-gray-700">
                        <a
                          className="hover:opacity-80"
                          href={`/notice/upload?noticeId=${notice._id}`}
                        >
                          <button>수정</button>
                        </a>
                      </td>
                      <td className="px-6 py-4 w-10 whitespace-nowrap text-sm text-gray-700">
                        <button
                          className="hover:opacity-80"
                          onClick={() => {
                            setNoticeId(notice._id);
                            setOpenModal(true);
                          }}
                          disabled={loading}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Notification
        show={notiFlags.success}
        close={() => setNotiFlags({ ...notiFlags, success: false })}
        title="삭제되었습니다."
      />
      <Notification
        show={notiFlags.fail}
        close={() => setNotiFlags({ ...notiFlags, fail: false })}
        title={errorMessage}
        variant="alert"
      />
      <Modal
        show={openModal}
        variant="alert"
        title="경고"
        content="정말 이 공지를 삭제하시겠어요? 이 작업은 돌이킬 수 없습니다."
        actionButton={{
          label: '삭제',
          onClick: () => {
            handleDelete(noticeId);
            setOpenModal(false);
          },
        }}
        cancelButton={{
          label: '취소',
          onClick: () => setOpenModal(false),
        }}
      />
    </div>
  );
};

NoticePage.Layout = Dashboard;
export default NoticePage;
