import { Router } from 'express';

import Paths from '@src/common/constants/Paths';
import UserRoutes from './routes/UserRoutes';
import ArticalsRoutes from './routes/ArticalsRoutes';


/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();


// ** Add UserRouter ** //

// Init router
const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);


// ** Add ArticalsRouter ** //

// Init router
const articalsRouter = Router();

// Get all articles
articalsRouter.get(Paths.Articles.Get, ArticalsRoutes.getAll);
articalsRouter.post('/add', ArticalsRoutes.add);
articalsRouter.get('/:id', ArticalsRoutes.getOne);

// Add ArticalsRouter
apiRouter.use(Paths.Articles.Base, articalsRouter);


/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
