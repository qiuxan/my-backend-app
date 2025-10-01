// export a express middleware 

import { Request, Response, NextFunction } from 'express';

export function logRequestDetails(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
}