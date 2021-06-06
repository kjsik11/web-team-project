const getContentByMdUrl: (markdownUrl: string) => Promise<string> = async (
  markdownUrl,
) => {
  const response = await fetch(markdownUrl);

  if (!response.ok) {
    throw new Error('Error fetching MD file from markdownUrl.');
  }

  const content = await response.text();

  return content;
};

export default getContentByMdUrl;
