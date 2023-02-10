// all required imports
import { UserType } from './../types/types';
import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { generateTokenBySpecificUser } from '../more_functionality/generateTokenbySpecifiecUser';
// create instance of UserModel
const ourUser = new UserModel();

// Export authenticateUser function
export const authenticateUser = async function (
  request: Request,
  response: Response
) {
  try {
    const userName = request.body.userName as string,
      password = request.body.password as string;
    const requiredUser: UserType | null = await ourUser.authenticateUser(
      userName,
      password
    );
    if (!requiredUser) {
      response.status(400).json({
        status: 'Failed',
        message: 'Failed to find this user ..',
      });
    } else {
      response.json({
        status: 'success',
        data: { ...requiredUser },
      });
    }
  } catch (error) {
    response
      .status(400)
      .send(
        `<h2>Failed to process your request due this error: ${error} </h2>`
      );
  }
};
// Export indexAllUsers
export const indexAllUsers = async function (
  // added "_" because it is not used request
  _request: Request,
  response: Response
): Promise<void> {
  try {
    const allRetrievedUsers: UserType[] = await ourUser.indexAllUsers();
    response.status(200).json({
      status: 'success',
      data: { ...allRetrievedUsers },
    });
  } catch (error) {
    response
      .status(400)
      .send(
        `<h2>Failed to process your request due this error: ${error} </h2>`
      );
  }
};
// Export addNewUser
export const addNewUser = async function (
  request: Request,
  response: Response
) {
  try {
    const firstName = request.body.firstName as unknown as string,
      lastName = request.body.lastName as unknown as string,
      userName = request.body.userName as unknown as string,
      password = request.body.password as unknown as string;

    if (!firstName || !lastName || !userName || !password) {
      response
        .status(400)
        .send(
          '<h2>Please make sure that all required params are provided ..</h2>'
        );
    } else {
      const createdUser: UserType = await ourUser.addNewUser({
        firstName,
        lastName,
        userName,
        password,
      });

      response.status(200).json({
        status: 'success',
        data: { ...createdUser },
        token: generateTokenBySpecificUser(createdUser),
      });
    }
  } catch (error) {
    response
      .status(400)
      .send(
        `<h2>Couldn't create the new user due to this error: ${error} </h2>`
      );
  }
};
// Export showSpecificUser
export const showSpecificUser = async function (
  request: Request,
  response: Response
): Promise<void> {
  try {
    const userId = parseInt(request.params.id);
    const requiredUser: UserType = await ourUser.showSpecificUser(userId);
    if (!requiredUser) {
      response.status(400).json({
        status: 'Failed',
        message: 'There is no user with this id ..',
      });
    } else {
      response.status(200).json({
        status: 'success',
        data: { ...requiredUser },
      });
    }
  } catch (error) {
    response.status(400).json({
      status: 'Failed',
      message: `Failed to process your request due this error: ${error}`,
    });
  }
};
// Export updateSpecificUser
export const updateSpecificUser = async function (
  request: Request,
  response: Response
): Promise<void> {
  try {
    const id = parseInt(request.params.id),
      firstName = request.body.firstName as unknown as string,
      lastName = request.body.lastName as unknown as string;

    if (!firstName || !lastName) {
      response
        .status(400)
        .send('<h2>make sure that all needed params are provided..</h2>');
    } else {
      const updatedUser: UserType = await ourUser.updateSpecificUser(id, {
        firstName,
        lastName,
      });
      if (!updatedUser) {
        response.status(400).json({
          status: 'Failed',
          message: 'There is no user with this id...',
        });
      } else {
        response.status(200).json({
          status: 'success',
          data: { ...updatedUser },
        });
      }
    }
  } catch (error) {
    response
      .status(400)
      .send(`<h2>Couldn't process your request due this error: ${error}</h2>`);
  }
};
export const deleteSpecificUser = async function (
  request: Request,
  response: Response
): Promise<void> {
  try {
    const id = parseInt(request.params.id);
    await ourUser.deleteSpecificUser(id);
    response.status(200).json({
      status: 'success',
      message: `User with id ${id} successfully deleted (if exist) ... `,
    });
  } catch (error) {
    response
      .status(400)
      .send(`<h2>Couldn't process your request due this error: ${error}</h2>`);
  }
};
