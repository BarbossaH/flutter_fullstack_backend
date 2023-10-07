import JWT from 'jsonwebtoken';

export const authTokenCheck = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    console.log(req.header('x-auth-token'), 123);
    if (!token) {
      return res.status(401).json({ message: 'No auth token' });
    }
    const decode = JWT.verify(token, process.env.JWT_TOKEN);
    if (!decode) {
      return res.status(401).json({ message: 'token verification failed.' });
    }
    req.userId = decode.id;
    req.token = token;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
