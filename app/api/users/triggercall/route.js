import { pusherServer } from "@lib/pusher";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { channel, event, data } = req.body;
      console.log('Request Body:', req.body);
      console.log('Pusher Server:', pusherServer);
      try {
        await pusherServer.trigger(channel, event, data);
        res.status(200).json({ message: 'Event triggered successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to trigger event' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { channel, event, data } = req.body;

//     try {
//       await pusherServer.trigger(channel, event, data);
//       res.status(200).json({ message: 'Event triggered successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to trigger event' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
