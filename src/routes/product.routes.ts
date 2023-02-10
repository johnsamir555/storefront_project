// all required imports
import { Router } from 'express';
import {
  addNewProduct,
  deleteSpecificProduct,
  indexAllProducts,
  showSpecificProduct,
  updateSpecificProduct,
} from '../handlers/product.handler';
import isAllowedUser from '../more_functionality/isAllowedUser';
// create instance of Router
const productRoutes = Router();
productRoutes
  // GeT /products to indexallProducts
  .get('/products', indexAllProducts)
  // GeT /products/:id to showSpecificProduct
  .get('/products/:id', showSpecificProduct)
  // POST /products/add to addNewProduct (token required)
  .post('/products/add', isAllowedUser, addNewProduct)
  // PUT /products/:id to updateSpecificProduct (token required)
  .put('/products/:id', isAllowedUser, updateSpecificProduct)
  // DELETE /products/:id to deleteSpecificProduct(token required)
  .delete('/products/:id', isAllowedUser, deleteSpecificProduct);
export { productRoutes };
