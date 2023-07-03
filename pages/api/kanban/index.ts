import type { NextApiResponse, NextApiRequest } from 'next/types';
import { mockData } from '@/mock/kanbanMockData';
import Pusher from 'pusher';

let data = mockData;

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.NEXT_PUBLIC_CLUSTER,
  useTLS: true
});

// TODO: add id params
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  switch (method) {
    case 'GET':
      res.status(200).json({ success: true, data });
      break;

    case 'PUT':
      await pusher.trigger('kanban', 'update', {
        data
      });

      res.status(200).json({ success: true });
      break;

    case 'POST':
      res.status(200);
      break;

    default:
      res.status(200);
      break;
  }
}
