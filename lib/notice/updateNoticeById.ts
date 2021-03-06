import uploadMarkdown from '@lib/aws/uploadMarkdown';
import fetcher from '@lib/fetcher';

const updateNoticeById: (
  noticeInput: NoticeInputs,
  noticeId: string,
) => Promise<void> = async ({ title, content }, noticeId) => {
  if (!title) throw new Error('제목을 입력해주세요');

  try {
    const markdownUrl = await uploadMarkdown(content);

    await fetcher(`/api/notice/${noticeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, markdownUrl }),
    });
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[updateNoticeById] error', err);
    }
    const { code, additionalInfo } = err;
    let message: string;
    switch (code) {
      case 2:
        message = '필수 요소를 모두 채우지 않았습니다.';
        break;
      default:
        message = `[${code}] 서버 에러 발생 ${err.message}`;
        break;
    }

    const error = new Error(message) as CustomError;
    error.code = code;
    error.additionalInfo = additionalInfo;

    throw error;
  }
};

export default updateNoticeById;
