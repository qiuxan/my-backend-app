import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import { expressjwt } from 'express-jwt'; // <-- Add this import

import BaseRouter from '@src/routes';

import Paths from '@src/common/constants/Paths';
import ENV from '@src/common/constants/ENV';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/util/route-errors';
import { NodeEnvs } from '@src/common/constants';


/******************************************************************************
                                Setup
******************************************************************************/

const app = express();


// **** Middleware **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Show routes called in console during development
if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (ENV.NodeEnv === NodeEnvs.Production) {
  // eslint-disable-next-line n/no-process-env
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet());
  }
}

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Add express-jwt middleware for API protection
app.use(
  expressjwt({
    secret: 'secret-key', // Use your JWT secret from ENV
    algorithms: ['HS256'],
    credentialsRequired: true,
  }).unless({ 
    path: [
      /^\/stylesheets\/.*/, // Allow all stylesheets
      /^\/public\/.*/,      // Allow all public assets
      '/',                  // <-- Allow root path without auth
      '/users', 
      '/api/users', 
      '/api/users/all',     // <-- Make /api/users/all public
      '/api/users/login',   // <-- Make /api/users/login public
      { url: /^\/api\/articles\/\w+/, methods: ['GET'] }, // <-- Only allow GET
    ]
  })
);

// Handle 401 Unauthorized errors from express-jwt
app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next(err);
});

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});


// **** FrontEnd Content **** //

// Set views directory and configure EJS
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
app.set('view engine', 'ejs');

// Nav to users pg by default
app.get('/', (_: Request, res: Response) => {
  return res.redirect('/users');
});

// Render users page with EJS
app.get('/users', async (_: Request, res: Response) => {
  try {
    // Import UserService dynamically to avoid circular dependencies
    const UserService = await import('@src/services/UserService');
    const users = await UserService.default.getAll();
    
    // Format the created date for display
    const formattedUsers = users.map(user => ({
      ...user,
      createdFormatted: new Date(user.created).toLocaleString()
    }));
    
    return res.render('users', { 
      title: 'Users Management', 
      users: formattedUsers 
    });
  } catch (error) {
    logger.err('Error fetching users:', error);
    return res.render('users', { 
      title: 'Users Management', 
      users: [] 
    });
  }
});


/******************************************************************************
                                Export default
******************************************************************************/

export default app;
