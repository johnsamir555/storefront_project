// all required imports
import { Router } from 'express';
import {
  addNewUser,
  authenticateUser,
  deleteSpecificUser,
  indexAllUsers,
  showSpecificUser,
  updateSpecificUser,
} from '../handlers/user.handler';
import isAllowedUser from '../more_functionality/isAllowedUser';

// create instance of Router
const userRoutes = Router();
userRoutes
  // GeT /users to indexallUsers (require token)
  .get('/users/', isAllowedUser, indexAllUsers)
  // GeT /users/:id to showSpecificUser (require token)
  .get('/users/:id', isAllowedUser, showSpecificUser)
  // POST /users/add to addNewUser
  .post('/users/add', addNewUser)
  // POST /users/auth to authenticateUser
  .post('/users/auth', authenticateUser)
  // PUT /users/:id to updateSpecificUser (require token)
  .put('/users/:id', isAllowedUser, updateSpecificUser)
  // DELETE /users/:id to deleteSpecificUser (require token)
  .delete('/users/:id', isAllowedUser, deleteSpecificUser);
export { userRoutes };
