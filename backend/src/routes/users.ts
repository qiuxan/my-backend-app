import express, { query } from 'express';

const userRouter = express.Router();

userRouter.get('/register', (req, res) => {

  console.log('testing: http://localhost:3000/users/register?m=development&n=123');
  console.log({query: req.query}); 
  res.json({ message: 'User registration route' });
});

export default userRouter;