import uploadMarkdown from '@lib/aws/uploadMarkdown';
import fetcher from '@lib/fetcher';
import checkToken from '@lib/v1/auth/checkToken';

const uploadNotice: (noticeInput: NoticeInputs) => Promise<void> = async ({
  title,
  content,
}) => {
  if (!title) throw new Error('제목을 입력해주세요');

  try {
    await checkToken().catch(() => {});

    const markdownUrl = await uploadMarkdown(content);

    await fetcher('/api/v1/admin/notice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, markdownUrl }),
    });
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[uploadNotice] error', err);
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

export default uploadNotice;
