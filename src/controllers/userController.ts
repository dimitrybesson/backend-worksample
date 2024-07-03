import { Request, Response } from 'express';
import userService from '../services/userService';
import logger from '../loggger';


class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Missing required field 'email'" })
    }

    if (!name) {
      return res.status(400).json({ message: "Missing required field 'name'" })
    }

    try {
      const user = await userService.getUserByEmail(email);

      if (user) {
        return res.status(409).json({ message: `User with email '${email}' already exists` })
      }    
    } catch (err) {
      logger.error('Error getting user.', err)
      res.status(500).json({ message: 'Server error' });
    }

    
    try {
      const user = await userService.createUser(name, email);
      res.status(201).json(user);
    } catch (err) {
      logger.error('Error creating user.', err)
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getUsers(req: Request, res: Response) {
    const order = req.query?.created === 'desc' ? 'DESC' : 'ASC';

    try {
      const users = await userService.getUsers(order);
      res.status(200).json(users);
    } catch (err) {
      logger.error('Error getting users', err);
      res.status(500).json({ message: 'Server error' });
    }
  }

}

export default new UserController();