import fetcher from '@lib/fetcher';

const getAllNotices: () => Promise<NoticeInfo[]> = async () => {
  const { notices } = await fetcher('/api/v1/admin/notice');

  return notices;
};

export default getAllNotices;
