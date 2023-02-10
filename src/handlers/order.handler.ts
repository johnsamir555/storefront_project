import { PurchaseListType } from './../types/types';
import { Request, Response } from 'express';
import { OrderModel } from '../models/order.model';

const ourOrder = new OrderModel();
export const deleteSpecificOrder = async function (
  request: Request,
  response: Response
): Promise<void> {
  try {
    const id = parseInt(request.params.id);
    await ourOrder.deleteSpecificOrder(id);
    response.status(200).json({
      status: 'success',
      message: 'The order has been deleted successfully (if exist)..',
    });
  } catch (error) {
    response
      .status(400)
      .send(`<h2>Couldn't process your request due this error: ${error}</h2>`);
  }
};
export const indexAllOrders = async function (
  _request: Request,
  response: Response
): Promise<void> {
  try {
    const allRetrievedOrders = await ourOrder.indexAllOrders();

    response.status(200).json({
      status: 'success',
      data: {
        ...allRetrievedOrders,
      },
    });
  } catch (error) {
    response
      .status(400)
      .send(`<h2>Couldn't process your request due this error: ${error}</h2>`);
  }
};

export const showSpecificOrder = async function (
  request: Request,
  response: Response
): Promise<void> {
  try {
    const id = parseInt(request.params.id);
    const requiredOrder = await ourOrder.showSpecificOrder(id);

    if (!requiredOrder) {
      response.status(400).json({
        status: 'Failed',
        message: 'There is no order with this id...',
      });
    } else {
      response.status(200).json({
        status: 'success',
        data: { ...requiredOrder },
      });
    }
  } catch (error) {
    response
      .status(400)
      .send(`<h2>Couldn't process your request due this error: ${error}</h2>`);
  }
};

export const addNewOrder = async function (
  request: Request,
  response: Response
): Promise<void> {
  try {
    const products = request.body.products as unknown as PurchaseListType[],
      status = request.body.status as unknown as 'active' | 'complete',
      userId = request.body.userId as number;

    if (!products || !status || !userId) {
      response.status(400).json({
        status: 'failed',
        message:
          'Please sure that all required params like (products & status & userId)are provided..',
      });
    } else {
      const createdOrder = await ourOrder.addNewOrder({
        userId,
        status,
        products,
      });

      response.status(200).json({
        status: 'success',
        data: {
          ...createdOrder,
        },
        message: 'A new order has been created successfully...',
      });
    }
  } catch (error) {
    response
      .status(400)
      .send(`<h2>Couldn't process your request due this error: ${error}</h2>`);
  }
};

export const updateSpecificOrder = async function (
  request: Request,
  response: Response
): Promise<void> {
  try {
    const id = parseInt(request.params.id),
      status = request.body.status as unknown as 'active' | 'complete';

    if (!status || !id) {
      response.status(400).json({
        status: 'Failed',
        message:
          'Please sure that all required params like ( status )  are provided..',
      });
      console.log(id)
    } else {
      const updatedOrder = await ourOrder.updateSpecificOrder(id, {
        status,
      });
      if (!updatedOrder) {
        response.status(400).json({
          status: 'Failed',
          message: 'There is no order with this id...',
        });
      } else {
        response.status(200).json({
          status: 'success',
          data: { ...updatedOrder },
          message: 'The order has been updated...',
        });
      }
    }
  } catch (error) {
    response
      .status(400)
      .send(`<h2>Couldn't process your request due this error: ${error}</h2>`);
  }
};
