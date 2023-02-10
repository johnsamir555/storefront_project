// all required imports
import { UserModel } from '../../models/user.model';
import { UserType } from './../../types/types';
import bcrypt from 'bcrypt';

// create instance of UserModel
const ourUser = new UserModel();
// Suite of User Model
describe('Suite of User Model', function () {
  const myUser: UserType = {
    firstName: 'bill',
    lastName: 'gates',
    userName: 'microsoft_users_model',
    password: 'pw12345',
  };
  it('Test updateSpecificUser method_return updated user', async function () {
    // 1- create the user & auth it
    const createdUser = await ourUser.addNewUser(myUser),
      // 2- update the user
      updatedUser = await ourUser.updateSpecificUser(
        createdUser.id as unknown as number,
        {
          firstName: 'bill_new',
          lastName: 'gates_new',
        }
      );

    // @ts-ignore
    expect(updatedUser.firstname).toBe('bill_new');
    // @ts-ignore
    expect(updatedUser.lastname).toBe('gates_new');
    // 3- delete the user
    await ourUser.deleteSpecificUser(createdUser.id as unknown as number);
  });

  it('Test indexAllUsers method_return list of users', async function () {
    // 1- create the user
    const createdUser = await ourUser.addNewUser(myUser),
      // 2- indexAllUsers
      allUsers = await ourUser.indexAllUsers();
    // 2- the test must be list of users
    expect(allUsers).toEqual([createdUser]);
    // 4- delete the user
    await ourUser.deleteSpecificUser(createdUser.id as unknown as number);
  });

  it('Test authenticateUser method_data must be the same', async function () {
    // 1- create the user
    const createdUser = await ourUser.addNewUser(myUser),
      // auth correct user
      authenticatedUser = await ourUser.authenticateUser(
        myUser.userName as string,
        myUser.password as string
      );

    // 2- test must be the same data as shown
    // @ts-ignore
    expect(authenticatedUser?.username).toBe(createdUser.username);
    // @ts-ignore
    expect(authenticatedUser?.password).toBe(createdUser.password);
    // 2- delete the user
    await ourUser.deleteSpecificUser(createdUser.id as unknown as number);
  });

  it('Test showSpecificUser method_must return required user', async function () {
    // 1- create the user
    const createdUser = await ourUser.addNewUser(myUser),
      // 2- get spicific user
      specificUser = await ourUser.showSpecificUser(createdUser.id as number);
    // 3- the test must return required user
    expect(specificUser).toEqual(createdUser);
    // 4- delete the user
    await ourUser.deleteSpecificUser(createdUser.id as unknown as number);
  });

  it('Test addNewuser method_data must be the same', async function () {
    // 1- create the user
    const createdUser = await ourUser.addNewUser(myUser);
    // @ts-ignore
    expect(createdUser.firstname).toBe(myUser.firstName);
    // @ts-ignore
    expect(createdUser.lastname).toBe(myUser.lastName);
    // @ts-ignore
    expect(createdUser.username).toBe(myUser.userName);
    // 3- delete the user
    await ourUser.deleteSpecificUser(createdUser.id as unknown as number);
  });

  it('Test DeleteSpecificUser method_return empty array of users', async function () {
    // 1- create the user
    const CreatedUser: UserType = await ourUser.addNewUser(myUser);
    // 2- delete the user
    await ourUser.deleteSpecificUser(CreatedUser.id as number);
    // 3- get all users after delete
    const usersAfterDelete = await ourUser.indexAllUsers();
    // 4- the test must be empty array
    expect(usersAfterDelete).toEqual([]);
  });
});
