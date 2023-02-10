// all required imports
import { Router } from 'express';
import {
  addNewOrder,
  deleteSpecificOrder,
  indexAllOrders,
  showSpecificOrder,
  updateSpecificOrder,
} from '../handlers/order.handler';
import isAllowedUser from '../more_functionality/isAllowedUser';
// create instance of Router
const orderRoutes = Router();
orderRoutes
  // GeT /orders to indexallOrders (require token)
  .get('/orders', isAllowedUser, indexAllOrders)
  // GeT /orders/:id to showSpecificOrder (require token)
  .get('/orders/:id', isAllowedUser, showSpecificOrder)
  // POST /orders/add to addNewOrder (require token)
  .post('/orders/add',isAllowedUser, addNewOrder)
  // PUT /orders/:id to updateSpecificOrder (require token)
  .put('/orders/:id', isAllowedUser, updateSpecificOrder)
  // DELETE /orders/:id to deleteSpecificOrder (require token)
  .delete('/orders/:id', isAllowedUser, deleteSpecificOrder);
export { orderRoutes };
