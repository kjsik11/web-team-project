import React, { useEffect, useState } from 'react';
import cn from 'classnames';

// components
import { useUI } from '@components/ui/context';
import Modal from '@components/ui/Modal';
import Notification from '@components/ui/Notification';
import CommonNavBar from '@components/core/CommonNavBar';

const Common: React.FC = ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const { modalFlag, modalContent, notiFlag, closeNoti, notiContent } = useUI();

  useEffect(() => {
    const scrollHandler = () => {
      setHasScrolled(window.scrollY > 0);
    };

    scrollHandler();
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <>
      <div className="relative h-full w-full">
        <header
          className={cn('fixed w-full top-0 z-10', { shadow: hasScrolled })}
        >
          <CommonNavBar />
        </header>
        <main className="relative pt-16">{children}</main>
      </div>
      <Modal show={modalFlag} {...modalContent} />
      <Notification
        show={notiFlag}
        close={() => closeNoti()}
        variant={notiContent.variant}
        title={notiContent.title}
        content={notiContent.content}
      />
    </>
  );
};

export default Common;
