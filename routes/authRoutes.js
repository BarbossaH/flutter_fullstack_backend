import express from 'express';

const router = express.Router();

router.get('/hello-world', (req, res) => {
  res.json({ hi: 'hello world' });
});

export default router;
