import userRepository from '../repositories/userRepository';

class UserService {
  async createUser(name: string, email: string) {
    return await userRepository.createUser(name, email);
  }

  async getUsers(order?: 'ASC' | 'DESC') {
    return await userRepository.getUsers(order);
  }

  async getUserByEmail(email: string) {
    return await userRepository.getUserByEmail(email);
  }
}

export default new UserService();