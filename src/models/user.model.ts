// All required imports for this module
import { UserType } from '../types/types';
import { pool } from '../database/connection';
import bcrypt from 'bcrypt';
const { BC_PASSWORD, SALT_ROUNDS } = process.env;
class UserModel {
  authenticateUser = async function (
    userName: string,
    password: string
  ): Promise<UserType | null> {
    try {
      const conn = await pool.connect();
      const { rows } = await conn.query(
        'SELECT * FROM users WHERE username=$1',
        [userName]
      );

      if (rows.length > 0) {
        const retrievedUser: UserType = rows[0];

        if (
          bcrypt.compareSync(
            password + BC_PASSWORD,
            retrievedUser.password as string
          )
        ) {
          return retrievedUser;
        }
      }

      conn.release();
      return null;
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };

  // UpdateSpecificUser
  updateSpecificUser = async function (
    id: number,
    newValues: UserType
  ): Promise<UserType> {
    try {
      const conn = await pool.connect();
      const { rows } = await conn.query(
        'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *',
        [newValues.firstName, newValues.lastName, id]
      );

      conn.release();
      return rows[0];
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };
  //   showSpecificUser
  showSpecificUser = async function (id: number): Promise<UserType> {
    try {
      const conn = await pool.connect();
      const { rows } = await conn.query('SELECT * FROM users WHERE id = $1', [
        id,
      ]);
      conn.release();
      return rows[0];
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };

  // indexAllUsers
  indexAllUsers = async function (): Promise<UserType[]> {
    try {
      const conn = await pool.connect();
      const { rows } = await conn.query('SELECT * FROM users');
      conn.release();
      return rows;
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };
  //  deleteSpecificUser
  deleteSpecificUser = async function (id: number): Promise<UserType[]> {
    try {
      const conn = await pool.connect();
      const { rows } = await conn.query(
        'DELETE FROM users WHERE id=$1 RETURNING *',
        [id]
      );
      conn.release();
      return rows;
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };
  //  addNewUser
  addNewUser = async function (user: UserType): Promise<UserType> {
    try {
      const hashedPassword = bcrypt.hashSync(
          (user.password as string) + BC_PASSWORD,
          parseInt(SALT_ROUNDS as string)
        ),
        conn = await pool.connect(),
        { rows } = await conn.query(
          'INSERT INTO users (firstname, lastname, username , password) VALUES ($1, $2, $3, $4) RETURNING *',
          [user.firstName, user.lastName, user.userName, hashedPassword]
        );
      conn.release();
      return rows[0];
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };
}
export { UserModel };
