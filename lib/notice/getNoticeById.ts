import fetcher from '@lib/fetcher';

const getNoticeById: (noticeId: string) => Promise<NoticeInputs> = async (
  noticeId,
) => {
  const {
    notice: { title, content },
  } = await fetcher(`/api/notice/${noticeId}`);

  return { title, content };
};

export default getNoticeById;
