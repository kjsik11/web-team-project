import React from 'react';
import NextImage from 'next/image';
import cn from 'classnames';

interface Props {
  className?: string;
  picture: string;
  title: string;
}

const SectionTitle: React.FC<Props> = ({ className, picture, title }) => {
  return (
    <div className={cn(className, 'flex items-center space-x-6')}>
      <NextImage
        src={picture}
        alt={`${title}-icon`}
        layout="fixed"
        width={48}
        height={48}
        sizes="48px"
      />
      <h1 className="text-3xl font-medium capitalize">{title}</h1>
    </div>
  );
};

export default SectionTitle;
