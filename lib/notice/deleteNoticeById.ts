import fetcher from '@lib/fetcher';

const deleteNoticeById: (noticeId: string) => Promise<void> = async (
  noticeId,
) => {
  try {
    await fetcher(`/api/v1/admin/notice/${noticeId}`, {
      method: 'DELETE',
    });
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[deleteNoticeById] error', err);
    }
    const { code, additionalInfo } = err;
    let message: string;
    switch (code) {
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

export default deleteNoticeById;
