import axios from '../../../lib/api';
const api = async (req, res) => {
  if (req.method === 'POST') {
    res = await axios

      .post('/api/auth/local/register', req.body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        return res.status(200).json({
          message: `Check your email (${req.body.email}) and follow the instructions to confirm your account.`,
        });
      })
      .catch((error) => {
        if (!error.response.data.error.message) {
          return res.status(500).json({ message: 'Internal server error' });
        } else {
          const messages = error.response.data.error.message;
          return res.status(403).json({ message: messages });
        }
      });
  }
};

export default api;
