// all required imports
import { OrderType } from './../../types/types';
import { Secret } from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../../server';
import { ProductType, UserType } from '../../types/types';
// run supertest over the application
const request = supertest(app);
// Suite of orders handler
describe('Suite of order handler:', async function () {
  // define variables here to be accessible anywhere in the describe function
  let userId: number,
    productId: number,
    orderId: number,
    myOrder: OrderType,
    token: Secret;
  const myUser: UserType = {
    firstName: 'elon',
    lastName: 'musk',
    userName: 'spacex_order_handler',
    password: 'pw12345',
  };
  const myProduct: ProductType = {
    productName: 'laptop_hp_order_handler',
    productPrice: 20000,
  };

  beforeAll(async function () {
    // get the data sent in the response
    const { body } = await request.post('/users/add').send(myUser);
    // set the token
    token = body.token;
    // set userId
    userId = body.data.id;
    // to avoid redeclare "body"
    if (userId) {
      // get the data sent in the response
      const { body } = await request.post('/products/add').set('Authorization', 'Bearer ' + token).send(myProduct);
      // set productId
      productId = body.data.id;
    }
    // set my order using productId & userId
    myOrder = {
      products: [
        {
          productId: productId,
          productQuantity: 200,
        },
      ],
      userId: userId,
      status: 'active',
    };
  });
  afterAll(async function () {
    await request
      .delete(`/orders/${orderId}`)
      .set('Authorization', 'Bearer ' + token);
    await request
      .delete(`/users/${userId}`)
      .set('Authorization', 'Bearer ' + token);
    await request
      .delete(`/products/${productId}`)
      .set('Authorization', 'Bearer ' + token);
  });

  it('Test POST /orders/add with not valid token_status must be 401', async function () {
    // get respnse status
    const { status } = await request
      .post('/orders/add')
      // send order in request
      .send(myOrder)
      // add incorrectToken with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + 'thisTokenisInValid');
    expect(status).toBe(401);
  });

  it('Test POST /orders/add with valid token_status must be 200', async function () {
    // get response status & the data sent to the client
    const { body, status } = await request
      .post('/orders/add')
      // add token with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + token)
      .send(myOrder);
    expect(status).toBe(200);
    // set orderId
    orderId = body.data.id;
  });

  it('Test GET /orders/ with valid token_status must be 200', async function () {
    // get respnse status
    const { status } = await request
      .get('/orders')
      // add token with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + token);
    expect(status).toBe(200);
  });

  it('Test GET /orders/ with not valid token_status must be 401', async function () {
    // get respnse status
    const { status } = await request
      .get('/orders')
      // add incorrectToken with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + 'thisTokenisInValid');
    expect(status).toBe(401);
  });
  it('Test GET /orders/ with  valid token_status must be 200', async function () {
    // get respnse status
    const { status } = await request
      .get('/orders')
      // add token with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + token);
    expect(status).toBe(200);
  });

  it('Test GET /orders/:orderId with valid token_status must be 200', async function () {
    // get respnse status
    const { status } = await request
      .get(`/orders/${orderId}`)
      // add token with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + token);
    expect(status).toBe(200);
  });

  it('Test PUT /orders/:orderId with not valid token_status must be 401', async function () {
    // get respnse status
    const { status } = await request
      .put(`/orders/${orderId}`)
      // add incorrectToken with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + 'thisTokenisInValid')
      .send({
        ...myOrder,
        status: 'complete',
      });
    expect(status).toBe(401);
  });

  it('Test PUt /orders/:orderId with valid token_status must be 200', async function () {
    // get response status & the data sent to the client
    const { status } = await request
      .put(`/orders/${orderId}`)
      // add token with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + token)
      // send order in request
      .send({
        ...myOrder,
        status: 'complete',
      });
    expect(status).toBe(200);
  });
  it('Test DELETE /orders/:orderId with not valid token_status must be 401', async function () {
    // get respnse status
    const { status } = await request
      .delete(`/orders/${orderId}`)
      // add incorrectToken with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + 'thisTokenisInValid');
    expect(status).toBe(401);
  });
  it('Test DELETE /orders/:orderId with valid token_status must be 200', async function () {
    // get respnse status
    const { status } = await request
      .delete(`/orders/${orderId}`)
      // add token with tokenPrefix "Bearer"
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
  });
});
