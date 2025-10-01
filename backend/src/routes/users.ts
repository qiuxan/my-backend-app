import express from 'express';

const userRouter = express.Router();

userRouter.get('/register', (req, res) => {
  res.json({ message: 'User registration route' });
});

export default userRouter;