import { NextApiRequest, NextApiResponse } from 'next';

import { connectMongo, withErrorHandler, throwError } from '@utils/common';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { db } = await connectMongo();

    const cursor = db
      .collection('notice')
      .find({ deleted: null })
      .sort({ created: -1 });

    const notices = await cursor.toArray();

    await cursor.close();

    console.log(notices);
    return res.json({
      notices,
    });
  }
  return throwError(res, 1, 400);
};

export default withErrorHandler(handler);
