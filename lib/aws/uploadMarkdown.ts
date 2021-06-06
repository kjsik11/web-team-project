import fetcher from '@lib/fetcher';

const uploadMarkdown: (markdownText: string) => Promise<string> = async (
  markdownText,
) => {
  const { url, fields, markdownUrl } = await fetcher('/api/notice/aws');

  const formData = new FormData();

  Object.entries({ ...fields, file: markdownText }).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const resBody = await response.json();

    if (process.env.NODE_ENV === 'development') {
      console.log('[uploadMarkdown.ts] AWS Upload Failed.', resBody);
    }

    throw new Error('AWS Upload Failed.');
  }

  return markdownUrl;
};

export default uploadMarkdown;
