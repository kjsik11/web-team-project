import fetcher from '@lib/fetcher';

const uploadMarkdownImage: (file: File | string) => Promise<string> = async (
  file,
) => {
  const { url: preAssignedUrl, fields } = await fetcher(
    '/api/notice/aws/image',
  );

  const formData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });

  const response = await fetch(preAssignedUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const resBody = await response.json();

    if (process.env.NODE_ENV === 'development') {
      console.log('[uploadMarkdownImage.ts] AWS Upload Failed.', resBody);
    }

    throw new Error('AWS Upload Failed.');
  }

  const { url } = await fetcher<{ url: string }>('/api/notice/aws/image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: fields.key }),
  });

  return url;
};

export default uploadMarkdownImage;
