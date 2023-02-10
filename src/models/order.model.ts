// All required imports
import { OrderType, PurchaseListType } from '../types/types';
import { pool } from '../database/connection';
class OrderModel {
  // UpdateSpecificOrder
  updateSpecificOrder = async function (
    id: number,
    newValues: OrderType
  ): Promise<OrderType> {
    try {
      const conn = await pool.connect(),
        { rows } = await conn.query(
          `UPDATE orders SET status = $1 WHERE id=$2 RETURNING *`,
          [newValues.status, id]
        ),
        updatedOrder = rows[0],
        // Assign rows to new variable
        { rows: purchaseProducts } = await conn.query(
          'SELECT product_id, product_quantity FROM purchase_list WHERE order_id=$1',
          [updatedOrder.id]
        );
      conn.release();
      return {
        ...updatedOrder,
        products: purchaseProducts,
      };
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };
  //   showSpecificOrder
  showSpecificOrder = async function (id: number): Promise<OrderType> {
    try {
      const conn = await pool.connect(),
        { rows } = await conn.query('SELECT * FROM orders WHERE id= $1', [id]),
        requiredOrder: OrderType = rows[0],
        // Assign rows to new variable
        { rows: purchaseProductsRows } = await conn.query(
          'SELECT product_id, product_quantity FROM purchase_list WHERE order_id=$1',
          [requiredOrder.id]
        );
      conn.release();
      return {
        ...requiredOrder,
        products: purchaseProductsRows,
      };
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };

  // indexAllOrders
  indexAllOrders = async function (): Promise<OrderType[]> {
    try {
      const conn = await pool.connect(),
        { rows: orders } = await conn.query('SELECT * FROM orders'),
        allRetrievedOrders: OrderType[] = [];
      if (orders) {
        // Loop on orders to select thier products
        for (let i = 0; i < orders.length; i++) {
          const order = orders[i];
          // assign rows to new variable
          const { rows: purchaseProductsData } = await conn.query(
            'SELECT product_id, product_quantity FROM purchase_list WHERE order_id=$1',
            [order.id]
          );
          allRetrievedOrders.push({
            ...order,
            products: purchaseProductsData,
          });
        }
        conn.release();
        return allRetrievedOrders;
      } else {
        conn.release();
        return allRetrievedOrders;
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };
  //  deleteSpecificOrder
  deleteSpecificOrder = async function (id: number): Promise<OrderType[]> {
    try {
      const conn = await pool.connect();
      const { rows } = await conn.query('DELETE FROM orders WHERE id=$1', [id]);

      const requiredOrder = rows[0];
      conn.release();
      return requiredOrder;
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };
  //  addNewOrder
  addNewOrder = async function (order: OrderType) {
    try {
      const conn = await pool.connect();
      const { rows } = await conn.query(
        `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *`,
        [order.userId, order.status]
      );
      const requiredOrder: OrderType = rows[0];
      const purchaseProducts: PurchaseListType[] = [];
      // Loop on order products to insert them into purchase_list table
      if (order.products) {
        for (let i = 0; i < order.products.length; i++) {
          const product = order.products[i];
          const { rows } = await conn.query(
            'INSERT INTO purchase_list (order_id, product_id, product_quantity) VALUES($1, $2, $3) RETURNING product_id, product_quantity',
            [requiredOrder.id, product.productId, product.productQuantity]
          );
          purchaseProducts.push(rows[0]);
        }
      }

      conn.release();
      return {
        ...requiredOrder,
        products: [...purchaseProducts],
      };
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };
}
export { OrderModel };
