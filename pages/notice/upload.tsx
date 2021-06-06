import React from 'react';
import cn from 'classnames';
import ReactMde from 'react-mde';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';

// css
import 'react-mde/lib/styles/css/react-mde-all.css';

// components
import Input from '@components/ui/Input';
import Modal from '@components/ui/Modal';
import Notification from '@components/ui/Notification';
import Dashboard from '@components/layout/Dashboard';

// libraries
import uploadMarkdownImage from '@lib/aws/uploadMarkdownImage';

// utils
import formatDate from '@utils/formatDate';
import { mdToHtml } from '@utils/marked';

// icons
import Spinner from '@components/icons/Spinner';
import getNoticeById from '@lib/notice/getNoticeById';
import updateNoticeById from '@lib/notice/updateNoticeById';
import uploadNotice from '@lib/notice/uploadNotice';
import Button from '@components/ui/Button';
import { ChevronDownIcon } from '@heroicons/react/outline';
import BreadCrumb from '@components/ui/BreadCrumb';

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
  const [previewContent, setPreviewContent] = React.useState<string>('');
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write',
  );
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

  React.useEffect(() => {
    if (router.query.noticeId && typeof router.query.noticeId === 'string') {
      getNoticeById(router.query.noticeId)
        .then(async (notice) => {
          setPreviewContent(
            // await Promise.resolve(converter.makeHtml(notice.content)),
            await Promise.resolve(mdToHtml(notice.content)),
          );
          setNoticeInputs({ ...notice });
        })
        .catch((err) => setError(err.message));
    } else setNoticeInputs(initialNoticeInput);
  }, [router]);

  const save = async function* (data: ArrayBuffer) {
    yield await uploadMarkdownImage(
      new File([new Blob([data])], String(Number(new Date()))),
    );

    return true;
  };

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
      } catch (err) {
        setNotiContent(err.message);
        setNotiFlags({ success: false, fail: true });
        console.log('[UploadNotice] error', err.message);
      } finally {
        setLoading(false);
      }
      // setMdurl(url);
    },
    [router],
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
      <div className="w-full p-2.5 max-w-5xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={() => handleSubmit(noticeInputs)}
            disabled={loading}
            size="sm"
            className="mr-8"
          >
            {router.query.noticeId ? '수정' : '업로드'}
          </Button>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <p className="text-2xl font-bold">미리보기</p>
          <Disclosure as="div" defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={cn('pt-6 w-full text-left rounded-md', {
                    'pb-6': !open,
                  })}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xl font-semibold">
                      {noticeInputs.title}
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
                <Disclosure.Panel className="bg-gray-50 p-2 mt-2 mb-6" as="div">
                  {previewContent && (
                    <div
                      className="markdown-container"
                      dangerouslySetInnerHTML={{
                        __html: previewContent,
                      }}
                    />
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
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
        <ReactMde
          minEditorHeight={300}
          value={noticeInputs.content}
          onChange={(val) => {
            // setPreviewContent(converter.makeHtml(val));
            setPreviewContent(mdToHtml(val));
            setNoticeInputs({ ...noticeInputs, content: val });
          }}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            // Promise.resolve(converter.makeHtml(markdown))
            Promise.resolve(mdToHtml(markdown))
          }
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
          paste={{
            saveImage: save,
          }}
        />
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
