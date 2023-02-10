// all required imports
import { OrderModel } from '../../models/order.model';
import { ProductModel } from '../../models/product.model';
import { UserModel } from '../../models/user.model';
import { OrderType, ProductType, UserType } from '../../types/types';


// create instance of OrderModel
const ourOrder = new OrderModel();
// create instance of UserModel
const ourUser = new UserModel();
// create instance of ProductModel
const ourProduct = new ProductModel();

// Suite of Order model
describe('Suite of Order Model:', function () {
  // create some variable here to be accessed in "it" scope
  let myOrder: OrderType, userId: number, productId: number;
  // before Each test do this:
  beforeAll(async () => {
    // 1- create this user
    const createdUser: UserType = await ourUser.addNewUser({
      firstName: 'elon',
      lastName: 'musk',
      userName: 'tesla',
      password: 'pw12345',
    });
    // 2- set userId
    userId = createdUser.id as number;
    // 3- create product
    const createdProduct: ProductType = await ourProduct.addNewProduct({
      productName: 'laptop_order_model',
      productPrice: 20000,
    });
    // 4- set productId
    // @ts-ignore
    productId = createdProduct.id as number;

    // 5- set order using productId & userId
    myOrder = {
      products: [
        {
          productId: productId,
          productQuantity: 2,
        },
      ],
      userId: userId,
      status: 'active',
    };
  });
  // After each test do this :
  afterAll(async () => {
    // 2- delete product
    await ourProduct.deleteSpecificProduct(productId);
    // 3- delete user
    await ourUser.deleteSpecificUser(userId);
  });

  it(`Test addNewOrder method _ should add new order`, async function () {
    const createdOrder = await ourOrder.addNewOrder(myOrder);
    expect(createdOrder.status).toBe(myOrder.status);
    // @ts-ignore
    expect(createdOrder.user_id).toBe(myOrder.userId);
    await ourOrder.deleteSpecificOrder(createdOrder.id as number);
  });
  it(`Test indexAllOrders method _ should return all orders`, async function () {
    const createdOrder = await ourOrder.addNewOrder(myOrder);
    const allOrders = await ourOrder.indexAllOrders();
    expect(allOrders).toEqual([createdOrder]);
    await ourOrder.deleteSpecificOrder(createdOrder.id as number);
  });
  it(`Test showSpecificOrder method _ should return the required order`, async function () {
    const createdOrder = await ourOrder.addNewOrder(myOrder);
    const requiredOrder = await ourOrder.showSpecificOrder(
      createdOrder.id as number
    );
    expect(requiredOrder.status).toBe(myOrder.status);
    // @ts-ignore
    expect(requiredOrder.user_id).toBe(myOrder.userId);
    await ourOrder.deleteSpecificOrder(createdOrder.id as number);
  });
  it(`Test updateSpecificOrder method _ should update the required order`, async function () {
    const createdOrder = await ourOrder.addNewOrder(myOrder);
    const updatedOrder = await ourOrder.updateSpecificOrder(
      createdOrder.id as number,
      {
        status: 'complete',
      }
    );
    expect(createdOrder.status).toBe('active');
    expect(updatedOrder.status).toBe('complete');
    await ourOrder.deleteSpecificOrder(createdOrder.id as number);
  });
  // it(`Test deleteSpecificOrder method _ should return empty array of orders`, async function () {
  //   const createdOrder = await ourOrder.addNewOrder(myOrder);
  //   await ourOrder.deleteSpecificOrder(createdOrder.id as number);
  //   const allOrders = ourOrder.indexAllOrders();
  //   expect(allOrders).toEqual([]);
  // });
  it('Test DeleteSpecificOrder method_return empty array of users', async function () {
    // 1- create the user
    const CreatedOrder = await ourOrder.addNewOrder(myOrder);
    // 2- delete the user
    await ourOrder.deleteSpecificOrder(CreatedOrder.id as number);
    // 3- get all users after delete
    const ordersAfterDelete = await ourOrder.indexAllOrders();
    // 4- the test must be empty array
    expect(ordersAfterDelete).toEqual([]);
  });
});
