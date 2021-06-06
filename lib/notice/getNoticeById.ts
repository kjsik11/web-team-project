import fetcher from '@lib/fetcher';

const getNoticeById: (noticeId: string) => Promise<NoticeInputs> = async (
  noticeId,
) => {
  const {
    notice: { title, markdownUrl },
  } = await fetcher(`/api/notice/${noticeId}`);

  const response = await fetch(markdownUrl);

  if (!response.ok) {
    throw new Error('Error fetching MD file from markdownUrl.');
  }

  const content = await response.text();

  return { title, content };
};

export default getNoticeById;
