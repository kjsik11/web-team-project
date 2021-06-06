import React from 'react';
import cn from 'classnames';
import { Disclosure } from '@headlessui/react';

// utils
import formatDate from '@utils/formatDate';
import { mdToHtml } from '@utils/marked';

// css
import s from '@assets/mde.module.css';
import getContentByMdUrl from '@lib/claNotice/getContentByMdUrl';
import { ChevronDownIcon } from '@heroicons/react/outline';

// icons

interface Props {
  className?: string;
  noticeItem: NoticeInfo;
}

const NoticeListItem: React.FC<Props> = ({ className, noticeItem }) => {
  return (
    <Disclosure
      as="div"
      className={cn(className, s.root, 'border-b border-gray-200')}
    >
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
            <p>{noticeItem.content}</p>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NoticeListItem;
