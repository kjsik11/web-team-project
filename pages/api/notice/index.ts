import { NextApiRequest, NextApiResponse } from 'next';

import { connectMongo, withErrorHandler, throwError } from '@utils/common';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  const { db } = await connectMongo();

  if (req.method === 'GET') {
    const cursor = db
      .collection('notice')
      .find({ deleted: null }, { sort: { created: -1 } });

    const notices = await cursor.toArray();

    await cursor.close();

    return res.json({
      notices,
    });
  }

  if (req.method === 'POST') {
    const { title, markdownUrl } = req.body;

    const { insertedId } = await db.collection('notice').insertOne({
      title,
      markdownUrl,
      created: new Date(),
      lastUpdated: new Date(),
      deleted: null,
    });

    return res.json({ noticeId: insertedId });
  }

  return throwError(res, 1, 400);
};

export default withErrorHandler(handler);
