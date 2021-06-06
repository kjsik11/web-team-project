import fetcher from '@lib/fetcher';

const uploadImageFile: (file: File) => Promise<{ key: string }> = async (
  file,
) => {
  const { url, fields } = await fetcher(
    `/api/aws/image?ext=${file.name.split('.').slice(-1)[0]}`,
  );

  const formData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const resBody = await response.json();

    if (process.env.NODE_ENV === 'development') {
      console.log('[uploadImageFile.ts] AWS Upload Failed.', resBody);
    }

    throw new Error('AWS Upload Failed.');
  }
  return { key: fields.key };
};

export default uploadImageFile;
