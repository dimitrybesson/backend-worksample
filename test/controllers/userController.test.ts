import { Request, Response } from 'express';
import userController from '../../src/controllers/userController';
import userService from '../../src/services/userService';
import User from '../../src/models/user';

jest.mock('../../src/services/userService');

describe('UserController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;

  const name = 'John Doe';
  const email = 'john.doe@example.com';
  const user = new User(1, name, email, new Date());
  const users = [
    user,
    new User(2, 'Jane Smith', 'jane.smith@example.com', new Date())
  ];

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    statusMock = res.status as jest.Mock;
    jsonMock = res.json as jest.Mock;
    sendMock = res.send as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {

      req.body = { name, email };
      (userService.createUser as jest.Mock).mockResolvedValue(user);

      await userController.createUser(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(user);
      expect(userService.createUser).toHaveBeenCalledTimes(1);
      expect(userService.createUser).toHaveBeenCalledWith(name, email);
    });

    it('should handle errors when creating user in createUser', async () => {

      req.body = { name, email };
      (userService.createUser as jest.Mock).mockRejectedValue(new Error('Database error'));
      await userController.createUser(req as Request, res as Response);

      expect(userService.createUser).toHaveBeenCalledWith(name, email);
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Server error' });
    });

    it('should handle errors when checking for existing user in createUser', async () => {

      req.body = { name, email };
      (userService.getUserByEmail as jest.Mock).mockRejectedValue(new Error('Database error'));

      await userController.createUser(req as Request, res as Response);

      expect(userService.getUserByEmail).toHaveBeenCalledWith(email);
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Server error' });
    });

    it('should return an error if email is not provided', async () => {

      req.body = { name };
      await userController.createUser(req as Request, res as Response);

      expect(userService.createUser).toHaveBeenCalledTimes(0);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Missing required field 'email'" });
    })

    it('should return an error if a name is not provided', async () => {

      req.body = { email };
      await userController.createUser(req as Request, res as Response);

      expect(userService.createUser).toHaveBeenCalledTimes(0);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Missing required field 'name'" });
    })


    it('should return an error if user with email already exists', async () => {

      req.body = { name, email };
      (userService.getUserByEmail as jest.Mock).mockResolvedValue(user);

      await userController.createUser(req as Request, res as Response);

      expect(userService.getUserByEmail).toHaveBeenCalledWith(email);
      expect(userService.createUser).toHaveBeenCalledTimes(0);
      expect(statusMock).toHaveBeenCalledWith(409);
      expect(jsonMock).toHaveBeenCalledWith({ message: `User with email '${email}' already exists` });
    })
  })

  describe('getUsers', () => {
    it('should return a list of users', async () => {

      (userService.getUsers as jest.Mock).mockResolvedValue(users);

      await userController.getUsers(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(users);
      expect(userService.getUsers).toHaveBeenCalledTimes(1);
    });

    it('should handle errors in getUsers', async () => {

      req.body = { name, email };
      (userService.getUsers as jest.Mock).mockRejectedValue(new Error('Database error'));

      await userController.getUsers(req as Request, res as Response);

      expect(userService.getUsers).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Server error' });
    });

    it('should return a list of users in ASC order by default', async () => {

      (userService.getUsers as jest.Mock).mockResolvedValue(users);

      await userController.getUsers(req as Request, res as Response);
      expect(userService.getUsers).toHaveBeenCalledTimes(1);
      expect(userService.getUsers).toHaveBeenCalledWith('ASC');
    });

    it('should return a list of users in ASC order by default', async () => {

      req.query = { created: 'desc' };
      (userService.getUsers as jest.Mock).mockResolvedValue(users);

      await userController.getUsers(req as Request, res as Response);
      expect(userService.getUsers).toHaveBeenCalledTimes(1);
      expect(userService.getUsers).toHaveBeenCalledWith('DESC');
    });

  })
});
