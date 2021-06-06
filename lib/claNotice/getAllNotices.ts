import fetcher from '@lib/fetcher';

const getAllNotices: () => Promise<NoticeInfo[]> = async () => {
  const { notices } = await fetcher('/api/cla-noti');

  return notices;
};

export default getAllNotices;
