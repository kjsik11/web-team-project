import { NextApiRequest, NextApiResponse } from 'next';
import { throwError, withErrorHandler } from '@utils/common';
import { doesObjectExist, getObjectByKey, getUploadUrl } from '@utils/aws';
import handleMarkdownImage from '@utils/handleMarkdownImage';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const data = await getUploadUrl({
      basePath: 'notice/images/raw/',
      maxSize: 50 * 1024 * 1024,
    });

    return res.json(data);
  }

  if (req.method === 'POST') {
    const { key } = req.body;

    if (!key) return throwError(res, 2, 400);

    if (!doesObjectExist(key)) return throwError(res, 10, 404);

    const { Body: buffer } = await getObjectByKey(key);

    const { url } = await handleMarkdownImage({
      input: buffer,
      basePath: 'notice/images/target/',
    });

    return res.status(201).json({ url });
  }

  return throwError(res, 1, 400);
};

export default withErrorHandler(handler);
