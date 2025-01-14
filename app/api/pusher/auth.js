import Pusher from 'pusher-js';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'ap2',
});

const auth = async (req, res) => {
  const { socket_id, channel_name } = req.body;

  if (!socket_id || !channel_name) {
    return res.status(400).json({ error: 'Missing socket_id or channel_name' });
  }

  const authResponse = pusher.authenticate(socket_id, channel_name);

  if (authResponse.status === 200) {
    return res.status(200).json(authResponse.body);
  } else {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default auth;