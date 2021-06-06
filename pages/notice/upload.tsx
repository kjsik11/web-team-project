import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';

// css
import s from '@assets/mde.module.css';
import 'react-mde/lib/styles/css/react-mde-all.css';

// components
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Modal from '@components/ui/Modal';
import Notification from '@components/ui/Notification';

// libraries
import updateNoticeById from '@lib/notice/updateNoticeById';
import getNoticeById from '@lib/notice/getNoticeById';
import uploadNotice from '@lib/notice/uploadNotice';

// utils
import formatDate from '@utils/formatDate';

// icons
import Spinner from '@components/icons/Spinner';
import { ChevronDownIcon } from '@heroicons/react/outline';

import Dashboard from '@components/layout/Dashboard';
import BreadCrumb from '@components/ui/BreadCrumb';
import TextArea from '@components/ui/TextArea';

const initialNoticeInput = {
  title: '',
  content: '본문을 입력해주세요',
};

const BreadPages = [
  {
    name: 'Notice',
    href: '/notice',
    current: false,
  },
  {
    name: 'Upload',
    href: '/upload',
    current: true,
  },
];

const UploadMarkdown = () => {
  const router = useRouter();
  const [noticeInputs, setNoticeInputs] = React.useState<NoticeInputs | null>(
    null,
  );
  const [error, setError] = React.useState<string | null>(null);

  // flags
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [notiFlags, setNotiFlags] = React.useState<{
    success: boolean;
    fail: boolean;
  }>({ success: false, fail: false });
  const [notiContent, setNotiContent] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchData = React.useCallback(async () => {
    if (router.query.noticeId && typeof router.query.noticeId === 'string') {
      await getNoticeById(router.query.noticeId)
        .then(async (notice) => {
          setNoticeInputs({ ...notice });
        })
        .catch((err) => setError(err.message));
    } else setNoticeInputs(initialNoticeInput);
  }, [router]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = React.useCallback(
    async (noticeInput: NoticeInputs) => {
      if (noticeInput === null) return;
      setLoading(true);

      try {
        if (
          router.query.noticeId &&
          typeof router.query.noticeId === 'string'
        ) {
          await updateNoticeById(noticeInput, router.query.noticeId);
        } else {
          await uploadNotice(noticeInput);
        }
        setOpenModal(true);
        fetchData();
      } catch (err) {
        setNotiContent(err.message);
        setNotiFlags({ success: false, fail: true });
        console.log('[UploadNotice] error', err.message);
      } finally {
        setLoading(false);
      }
    },
    [router, fetchData],
  );
  if (error !== null) return <div>{error}</div>;

  if (noticeInputs === null)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );

  return (
    <div className="pt-4 sm:pt-8 md:pt-12 pb-32 px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto ">
      <BreadCrumb pages={BreadPages} className="mb-8" />
      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-3xl font-semibold">
          공지사항 {router.query.noticeId ? '수정' : '업로드'}
        </h3>
      </div>
      <div className={cn(s.root, 'w-full p-2.5 max-w-5xl mx-auto')}>
        <div className="mb-8">
          {noticeInputs && (
            <Button
              onClick={() => handleSubmit(noticeInputs)}
              disabled={loading}
              size="sm"
              className="mr-8"
            >
              {router.query.noticeId ? '수정' : '업로드'}
            </Button>
          )}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-2xl font-bold">미리보기</p>
          <Disclosure as="div" defaultOpen className="bg-gray-100">
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={cn('pt-6 w-full text-left rounded-md', {
                    'pb-6': !open,
                  })}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xl font-semibold">
                      {noticeInputs && noticeInputs.title}
                    </p>
                    <ChevronDownIcon
                      className={cn('w-6 h-6 text-gray-400 transform', {
                        'rotate-180': open,
                      })}
                    />
                  </div>
                  <p className="text-gray-500 text-base font-normal">
                    {formatDate(new Date())} (날짜는 예시입니다.)
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel
                  className="bg-gray-100 p-2 mt-2 mb-6"
                  as="div"
                >
                  <p className="text-black">{noticeInputs.content}</p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        {noticeInputs && (
          <>
            <div className="mt-4">
              <Input
                label="제목"
                placeholder="제목을 입력하세요"
                className="mb-4"
                onChange={(e) =>
                  setNoticeInputs({ ...noticeInputs, title: e.target.value })
                }
                value={noticeInputs.title}
              />
            </div>
            <p>본문</p>
            <TextArea
              className="h-48"
              value={noticeInputs.content}
              onChange={(e) => {
                setNoticeInputs({
                  ...noticeInputs,
                  content: e.target.value,
                });
              }}
            />
          </>
        )}
      </div>
      <Modal
        show={openModal}
        title={`${router.query.noticeId ? '수정' : '업로드'}에 성공하였습니다.`}
        content={`공지사항 ${
          router.query.noticeId ? '수정' : '업로드'
        }에 성공하였습니다.`}
        actionButton={{
          label: '목록으로',
          onClick: () => {
            setOpenModal(false);
            router.push('/notice');
          },
        }}
        cancelButton={{
          label: '확인',
          onClick: () => setOpenModal(false),
        }}
      />
      <Notification
        show={notiFlags.fail}
        variant="alert"
        close={() => {
          setNotiFlags({ success: false, fail: false });
        }}
        title={notiContent}
      />
    </div>
  );
};

UploadMarkdown.Layout = Dashboard;
export default UploadMarkdown;
