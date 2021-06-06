import React from 'react';
import cn from 'classnames';
import { Disclosure } from '@headlessui/react';

// utils
import formatDate from '@utils/formatDate';

// css
import { ChevronDownIcon } from '@heroicons/react/outline';
import getContentByMdUrl from '@lib/claNotice/getContentByMdUrl';
import { mdToHtml } from '@utils/marked';

// icons

interface Props {
  className?: string;
  noticeItem: NoticeInfo;
}

const NoticeListItem: React.FC<Props> = ({ className, noticeItem }) => {
  const [content, setContent] = React.useState<string>('');

  React.useEffect(() => {
    getContentByMdUrl(noticeItem.markdownUrl)
      .then(async (content) =>
        setContent(await Promise.resolve(mdToHtml(content))),
      )
      .catch((err) => console.log(err.message));
  }, [noticeItem]);

  return (
    <Disclosure as="div" className={cn(className, 'border-b border-gray-200')}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={cn('pt-6 w-full text-left rounded-md', {
              'pb-6': !open,
            })}
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-xl font-semibold">{noticeItem.title}</p>
              <ChevronDownIcon
                className={cn('w-6 h-6 text-gray-400 transform', {
                  'rotate-180': open,
                })}
              />
            </div>
            <p className="text-gray-500 text-base font-normal">
              {formatDate(noticeItem.created)}
            </p>
          </Disclosure.Button>
          <Disclosure.Panel className="bg-gray-50 p-2 mt-2 mb-6" as="div">
            <div
              className="markdown-container"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NoticeListItem;
