import express, { query } from 'express';

const userRouter = express.Router();

userRouter.get('/register', (req, res) => {

  console.log('testing: http://localhost:3000/users/register?m=development&n=123');
  console.log({query: req.query}); 
  res.json({ message: 'User registration route' });
});

userRouter.get('/id/:userId', (req, res) => {
  const { userId } = req.params;
  console.log("testing: http://localhost:3000/users/id/456");
  res.json({ message: `User profile route for user ID: ${userId}` });
});

export default userRouter;