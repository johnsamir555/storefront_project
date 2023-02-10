// all required imports
import { ProductModel } from '../../models/product.model';
import { ProductType } from './../../types/types';

// create instance of ProductModel
const ourProduct = new ProductModel();
// Suite of Product Model
describe('Suite of Product Model', function () {
  const product: ProductType = {
    productName: 'laptop_product_model',
    productPrice: 20000,
  };

  it('Test updateSpecificProduct method_return updated product', async function () {
    // 1- create the product and update it
    const createdProduct = await ourProduct.addNewProduct(product);
    const updatedProduct = await ourProduct.updateSpecificProduct(
      // @ts-ignore
      createdProduct.id as number,
      {
        productName: 'laptop_newValue',
        productPrice: 25000,
      }
    );
    // 2- the test must return the updated correct product
    // @ts-ignore
    expect(updatedProduct.name as string).toEqual('laptop_newValue');
    // @ts-ignore
    expect(updatedProduct.price as number).toEqual(25000);
    // 3-delete the product
    await ourProduct.deleteSpecificProduct(
      // @ts-ignore
      createdProduct.id as unknown as number
    );
  });

  it('Test indexAllProducts method_return all products', async function () {
    // 1- create the product
    const createdProduct = await ourProduct.addNewProduct(product);
    // 2- indexAllUsers
    const allProducts = await ourProduct.indexAllProducts();
    // 3- the test must be defined
    expect(allProducts).toEqual([createdProduct]);
    // 4-delete the product
    await ourProduct.deleteSpecificProduct(
      // @ts-ignore
      createdProduct.id as unknown as number
    );
  });

  it('Test showSpecificProduct method _return the required product', async function () {
    // 1- create the product
    const createdProduct = await ourProduct.addNewProduct(product);
    const requiredProduct = await ourProduct.showSpecificProduct(
      // @ts-ignore
      createdProduct.id
    );
    // 2- the test must be defined
    expect(
      // @ts-ignore
      requiredProduct.name
    ).toEqual(product.productName);
    expect(
      // @ts-ignore
      requiredProduct.price
    ).toEqual(product.productPrice);
    // 3-delete the product
    await ourProduct.deleteSpecificProduct(
      // @ts-ignore
      createdProduct.id as unknown as number
    );
  });

  it('Test addNewproduct method _should add new product', async function () {
    // 1- create the product
    const createdProduct = await ourProduct.addNewProduct(product);
    // 2- the test must be defined
    // @ts-ignore
    expect(createdProduct.name).toEqual(product.productName);
    // @ts-ignore
    expect(createdProduct.price).toEqual(product.productPrice);
    // 3-delete the product
    await ourProduct.deleteSpecificProduct(
      // @ts-ignore
      createdProduct.id as unknown as number
    );
  });

  it('Test DeleteSpecificProduct method _ should delete the product', async function () {
    // 1- create the product
    const createdProduct = await ourProduct.addNewProduct(product);
    // 2-delete the product
    await ourProduct.deleteSpecificProduct(
      // @ts-ignore
      createdProduct.id as unknown as number
    );
    // 3- test must be empty array of products
    const allProductsAfterDelete = await ourProduct.indexAllProducts();
    expect(allProductsAfterDelete).toEqual([]);
  });
});
