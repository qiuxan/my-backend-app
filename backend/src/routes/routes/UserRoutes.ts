import { isNumber } from 'jet-validators';
import { transform } from 'jet-validators/utils';
import jwt from 'jsonwebtoken';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import UserService from '@src/services/UserService';
import User from '@src/models/User';

import { IReq, IRes } from '../common/types';
import { parseReq } from '../common/util';


/******************************************************************************
                                Constants
******************************************************************************/

const Validators = {
  add: parseReq({ user: User.test }),
  update: parseReq({ user: User.test }),
  delete: parseReq({ id: transform(Number, isNumber) }),
} as const;


/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Add one user.
 */
async function add(req: IReq, res: IRes) {
  console.log({ body: req.body });
  const { user } = Validators.add(req.body);
  await UserService.addOne(user);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq, res: IRes) {
  const { user } = Validators.update(req.body);
  await UserService.updateOne(user);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const { id } = Validators.delete(req.params);
  await UserService.delete(id);
  res.status(HttpStatusCodes.OK).end();
}

/*log in*/
async function login(req: IReq, res: IRes) {
  if(req.query.username === "admin" || req.query.password === "000") {
    const token = jwt.sign({ username: req.query.username }, 'secret-key', { expiresIn: '1d', algorithm: 'HS256' });
    res.status(HttpStatusCodes.OK).json({
      code: 1,
      message: "Login successful",
      data: {
        token 
      }
    });
 
  }else {
    res.status(HttpStatusCodes.UNAUTHORIZED).json({
      code: -1,
      message: "Invalid username or password"
    });
  }
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  add,
  update,
  delete: delete_,
  login,
} as const;
