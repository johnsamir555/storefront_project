// all required imports
import { ProductModel } from '../models/product.model';
import { Request, Response } from 'express';
import { ProductType } from '../types/types';

// create instance of ProductModel
const ourProduct = new ProductModel();
// Export addNewProduct
export const addNewProduct = async function (
  request: Request,
  response: Response
): Promise<void> {
  try {
    const productName = request.body.productName as unknown as string,
      productPrice = request.body.productPrice as unknown as number;

    if (!productName || !productPrice) {
      response.status(400).json({
        status: 'Failed',
        message:
          'Please sure that all required params like productName & productPrice are provided..',
      });
    } else {
      const createdProduct: ProductType = await ourProduct.addNewProduct({
        productName,
        productPrice,
      });

      response.status(200).json({
        status: 'success',
        data: {
          ...createdProduct,
        },
        message: 'A new product has been created successfully...',
      });
    }
  } catch (error) {
    response
      .status(400)
      .send(`<h2>Couldn't process your request due this error: ${error}</h2>`);
  }
};
// Export indexAllProducts
export const indexAllProducts = async function (
  // unused request
  _request: Request,
  response: Response
): Promise<void> {
  try {
    const allRetrievedProducts = await ourProduct.indexAllProducts();
    response.status(200).json({
      status: 'success',
      data: {
        ...allRetrievedProducts,
      },
    });
  } catch (error) {
    response
      .status(400)
      .send(`<h2>Couldn't process your request due this error: ${error}</h2>`);
  }
};
// Export updateSpecificProduct
export const updateSpecificProduct = async function (
  request: Request,
  response: Response
): Promise<void> {
  try {
    const id = request.params.id as unknown as number,
      productName = request.body.productName as unknown as string,
      productPrice = request.body.productPrice as unknown as number;

    if (!productName || !productPrice ||!id) {
      response.status(400).json({
        status: 'failed',
        message:
          'Please sure that all required params like productName & productPrice are provided..',
      });
    } else {
      const updatedProduct: ProductType =
        await ourProduct.updateSpecificProduct(id, {
          productName,
          productPrice,
        });
      if (!updatedProduct) {
        response.status(400).json({
          status: 'Failed',
          message: 'There is no products with this id..',
        });
      } else {
        response.status(200).json({
          status: 'success',
          data: { ...updatedProduct },
        });
      }
    }
  } catch (error) {
    response
      .status(400)
      .send(`<h2>Couldn't process your request due this error: ${error}</h2>`);
  }
};
// Export showSpecificProduct
export const showSpecificProduct = async function (
  request: Request,
  response: Response
): Promise<void> {
  try {
    const id = parseInt(request.params.id);

    if (!id) {
      response.status(401).json({
        status: 'failed',
        message: 'Please sure you have provide the param id ..',
      });
    } else {
      const requiredProduct: ProductType = await ourProduct.showSpecificProduct(
        id
      );
      if (!requiredProduct) {
        response.json({
          status: 'success',
          message: 'There is no products with this id..',
        });
      } else {
        response
          .json({
            status: 'success',
            data: { ...requiredProduct },
          })
          .status(200);
      }
    }
  } catch (error) {
    response
      .status(400)
      .send(`<h2>Couldn't process your request due this error: ${error}</h2>`);
  }
};
// Export deleteSpecificProduct
export const deleteSpecificProduct = async function (
  request: Request,
  response: Response
): Promise<void> {
  try {
    const id = parseInt(request.params.id);
    await ourProduct.deleteSpecificProduct(id);
    response.json({
      status: 'success',
      message: 'The product has been deleted successfully (if exist)..',
    });
  } catch (error) {
    response
      .status(400)
      .send(`<h2>Couldn't process your request due this error: ${error}</h2>`);
  }
};
