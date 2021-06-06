import { NextApiRequest, NextApiResponse } from 'next';

import { connectMongo, withErrorHandler, throwError } from '@utils/common';
import { ObjectId } from 'bson';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  const { noticeId } = req.query;

  const { db } = await connectMongo();

  const notice = await db.collection('notice').findOne({
    _id: new ObjectId(noticeId as string),
    deleted: null,
  });

  if (!notice) return throwError(res, 13, 404);

  if (req.method === 'GET') {
    return res.json({
      notice: {
        ...notice,
        _id: notice._id,
      },
    });
  }

  if (req.method === 'PUT') {
    const { title, markdownUrl } = req.body;
    const { upsertedId } = await db.collection('notice').updateOne(
      {
        _id: notice._id,
      },
      {
        $set: {
          title,
          markdownUrl,
          lastUpdated: new Date(),
        },
      },
    );

    return res.json({ updated: upsertedId });
  }

  if (req.method === 'DELETE') {
    await db.collection('notice').updateOne(
      {
        _id: notice._id,
      },
      {
        $set: { deleted: new Date() },
      },
    );

    return res.json({ deleted: 'success delete' });
  }

  return throwError(res, 1, 400);
};

export default withErrorHandler(handler);
