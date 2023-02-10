// all required imports
import supertest from 'supertest';
import app from '../../server';
import { ProductType, UserType } from '../../types/types';
// run supertest over the application
const request = supertest(app);
// Suite of products handler
describe('Suite of products handler:', async function () {
  // define variables here to be accessible anywhere in the describe function
  let token: string, productId: number,userId:number;
  // used user to get token
  const myUser: UserType = {
      firstName: 'nilson_2',
      lastName: 'mandella_2',
      userName: 'nilson6789',
      password: 'pw12345',
    },
    myProduct: ProductType = {
      productName: 'laptop_compaq_product_handler',
      productPrice: 10000,
    };

  beforeAll(async function () {
    // get the data sent in the response
    const { body } = await request.post('/users/add').send(myUser);
    // set the token
    token = body.token;
    userId = body.data.id;
  });
 afterAll(async function (){
  await request.delete(`/users/${userId}`).set('Authorization', 'Bearer ' + token)
 })

  it('Test POST /products/add with not valid token_ status should be 401', async function () {
    // get respnse status
    const { status } = await request
      .post('/products/add')
      // send a product in request
      .send(myProduct)
      // add token with tokenPrefix "Bearer"5
      .set('Authorization', 'Bearer ' + 'thisTokenisInValid');
    expect(status).toBe(401);
  });

  it('Test POST /products/add with valid token_ status should be 200', async function () {
    // get response status & the data sent to the client
    const { body, status } = await request
      .post('/products/add')
      // add token with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + token)
      // send a product in request
      .send(myProduct);
    expect(status).toBe(200);
    // set productId
    productId = body.data.id;
  });
  
  it('Test GET /products/ _ status should be 200', async function () {
    // get respnse status
    const { status } = await request
      .get('/products')
    expect(status).toBe(200);
  });

  it('Test GET /products/:productId _ status should be 200', async function () {
    // get respnse status
    const { status } = await request
      .get(`/products/${productId}`)
    expect(status).toBe(200);
  });

  it('Test PUT /products/:productId with not valid token_ status should be 401', async function () {
    // get respnse status
    const { status } = await request
      .put(`/products/${productId}`)
      // add incorrectToken with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + 'thisTokenisInValid')
      // send newValues in request
      .send({
        productName: 'updated_productName',
        productPrice: 'updated_productPrice',
      });
    expect(status).toBe(401);
  });

  it('Test PUT /products/:productId with valid token_ status should be 200', async function () {
   // get response status & the data sent to the client
   const { status } = await request
   .put(`/products/${productId}`)
   // add token with tokenPrefix "Bearer"
   .set('Authorization', 'Bearer ' + token)
   // send a product in request
   .send(myProduct);
 expect(status).toBe(200);
  });

  it('Test DELETE /products/:productId with valid token_ status should be 200', async function () {
    // get respnse status
    const { status } = await request
      .delete(`/products/${productId}`)
      // add token with tokenPrefix "Bearer"
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
  });
  it('Test DELETE /products/:productId with not valid token_ status should be 401', async function () {
    // get respnse status
    const { status } = await request
      .delete(`/products/${productId}`)
      // add incorrectToken with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + 'thisTokenisInValid')
    expect(status).toBe(401);
  });
});
