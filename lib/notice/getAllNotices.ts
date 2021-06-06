import fetcher from '@lib/fetcher';

const getAllNotices: () => Promise<NoticeInfo[]> = async () => {
  const { notices } = await fetcher('/api/notice');

  return notices;
};

export default getAllNotices;
