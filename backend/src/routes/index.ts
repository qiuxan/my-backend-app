import { Router } from 'express';

import Paths from '@src/common/constants/Paths';
import UserRoutes from './UserRoutes';
import ArticalsRoutes from './ArticalsRoutes';


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

// Add ArticalsRouter
apiRouter.use(Paths.Articles.Base, articalsRouter);


/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
