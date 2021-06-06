import { NextApiRequest, NextApiResponse } from 'next';

import { connectMongo, withErrorHandler, throwError } from '@utils/common';
import { ObjectId } from 'bson';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  const { db } = await connectMongo();

  if (req.method === 'GET') {
    const cursor = db.collection('notice').find({ deleted: null });

    const notices = await cursor.toArray();

    await cursor.close();

    return res.json({
      notices,
    });
  }

  if (req.method === 'POST') {
    const { title, content } = req.body;

    const { insertedId } = await db.collection('notice').insertOne({
      title,
      content,
      created: new Date(),
      lastUpdated: new Date(),
      deleted: null,
    });

    return res.json({ noticeId: insertedId });
  }

  return throwError(res, 1, 400);
};

export default withErrorHandler(handler);
