// all required imports
import supertest from 'supertest';
import app from '../../server';
import { UserType } from '../../types/types';
// run supertest over the application
const request = supertest(app);
// Suite of users handler
describe('Suite of users handler:', function () {
  // define variables here to be accessible anywhere in the describe function
  let token: string, firstUserId:number,secondUserId: number;
  const myUser: UserType = {
    firstName: 'nilson',
    lastName: 'mandella',
    userName: 'nilson678',
    password: 'pw12345',
  };

  beforeAll(async function () {
    // get the data sent in the response
    const { body } = await request.post('/users/add').send(myUser);
    // set the token
    token = body.token;
    firstUserId = body.data.id;
  });
  afterAll(async function(){
    await request.delete(`/users/${firstUserId}`).set('Authorization', `Bearer ${token}`);
    await request.delete(`/users/${secondUserId}`).set('Authorization', `Bearer ${token}`);
  })

  it('Test POST /users/add _ status must return 200', async function () {
    // get respnse status & data sent to the client
    const { body, status } = await request
      .post('/users/add')
      // send a user in request
      .send({
        firstName: 'harry',
        lastName: 'potter',
        userName: 'harry_series_user_handler',
        password: 'pw12345',
      });
    expect(status).toBe(200);
    // set userId
    secondUserId = body.data.id;
  });

  it('Test POST /users/auth _ status must return 200', async function () {
    // get respnse status 
    const {  status } = await request
      .post('/users/auth')
      // send a user in request
      .send({
        userName: 'nilson678',
        password: 'pw12345',
      });
    expect(status).toBe(200);
  });

  it('Test GET /users/ with valid token_ status must return 200', async function () {
    // get respnse status
    const { status } = await request
      .get('/users')
      // add token with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + token);
    expect(status).toBe(200);
  });

  it('Test GET /users/ with not valid token_ status must return 401', async function () {
    // get respnse status
    const { status } = await request
      .get('/users')
      // add incorrectToken with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + 'thisTokenisInValid');
    expect(status).toBe(401);
  });

  it('Test GET /users/:userId with valid token_ status must return 200', async function () {
    // get respnse status
    const { status } = await request
      .get(`/users/${secondUserId}`)
      // add token with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + token);
    expect(status).toBe(200);
  });
  it('Test GET /users/:userId with not valid token_ status must return 401', async function () {
    // get respnse status
    const { status } = await request
      .get(`/users/${secondUserId}`)
      // add incorrectToken with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + 'thisTokenisInValid');
    expect(status).toBe(401);
  });

  it('Test PUT /users/:userId with not valid token_ status must return 401', async function () {
    // get respnse status
    const { status } = await request
      .put(`/users/${secondUserId}`)
      // add incorrectToken with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + 'thisTokenisInValid')
      // send newValues in request
      .send({
        firstName: 'updated_firstName',
        lastName: 'updated_lastName',
      });
    expect(status).toBe(401);
  });

  it('Test PUT /users/:userId with valid token_ status must return 200', async function () {
    // get respnse status
    const { status } = await request
      .put(`/users/${secondUserId}`)
      // add token with tokenPrefix "Bearer"
      .set('Authorization', `Bearer ${token}`)
      // send newValues in request
      .send({ firstName: 'updated_firstName', lastName: 'updated_lastName' });
    expect(status).toBe(200);
  });

  it('Test DELETE /users/:userId with valid token _ status must return 200', async function () {
    // get respnse status
    const { status } = await request
      .delete(`/users/${secondUserId}`)
      // add token with tokenPrefix "Bearer"
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
  });
  it('Test DELETE /users/:userId with not valid token_ status must return 401', async function () {
    // get respnse status
    const { status } = await request
      .delete(`/users/${secondUserId}`)
      // add incorrectToken with tokenPrefix "Bearer"
      .set('Authorization', 'Bearer ' + 'thisTokenisInValid');
    expect(status).toBe(401);
  });
});
