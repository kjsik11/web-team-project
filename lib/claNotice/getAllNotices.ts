import fetcher from '@lib/fetcher';

const getAllNotices: () => Promise<NoticeInfo[]> = async () => {
  const { notices } = await fetcher('/api/cla-noti');

  console.log('notices', notices);
  return notices;
};

export default getAllNotices;
