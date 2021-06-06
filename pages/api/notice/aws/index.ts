import { NextApiRequest, NextApiResponse } from 'next';
import { throwError, withErrorHandler } from '@utils/common';
import { getUploadUrl } from '@utils/aws';

const cdnUrl = process.env.CLOUDFRONT_URL;
if (!cdnUrl) throw new Error('Missing CLOUDFRONT_URL.');

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const data = await getUploadUrl({
      basePath: 'notice/markdown/',
      forceKey: `${new Date().toISOString()}.md`,
      acl: 'public-read',
      maxSize: 10 * 1024 * 1024,
    });

    return res.json({ ...data, markdownUrl: `${cdnUrl}/${data.fields.key}` });
  }

  return throwError(res, 1, 400);
};

export default withErrorHandler(handler);
