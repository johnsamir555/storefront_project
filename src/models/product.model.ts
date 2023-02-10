// All required imports
import { ProductType } from '../types/types';
import { pool } from '../database/connection';
class ProductModel {
  // updateSpecificProduct
  updateSpecificProduct = async function (
    id: number,
    newValues: ProductType
  ): Promise<ProductType> {
    try {
      const conn = await pool.connect();
      const { rows } = await conn.query(
        'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
        [newValues.productName, newValues.productPrice, id]
      );
      conn.release();
      return rows[0];
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };
  //   showSpecificProduct
  showSpecificProduct = async function (id: number): Promise<ProductType> {
    try {
      const conn = await pool.connect();
      const { rows } = await conn.query('SELECT * FROM products WHERE id=$1', [
        id,
      ]);
      conn.release();
      return rows[0];
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };

  //  indexAllProducts
  indexAllProducts = async function (): Promise<ProductType[]> {
    try {
      const conn = await pool.connect();
      const { rows } = await conn.query('SELECT * FROM products');
      conn.release();
      return rows;
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };
  //  deleteSpecificProduct
  deleteSpecificProduct = async function (id: number): Promise<ProductType[]> {
    try {
      const conn = await pool.connect();
      const { rows } = await conn.query('DELETE FROM products WHERE id=$1', [
        id,
      ]);
      conn.release();
      return rows;
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };
  // addNewProduct
  addNewProduct = async function (product: ProductType): Promise<ProductType> {
    try {
      const conn = await pool.connect();
      const { rows } = await conn.query(
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
        [product.productName, product.productPrice]
      );
      conn.release();
      return rows[0];
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };
}
export { ProductModel };
