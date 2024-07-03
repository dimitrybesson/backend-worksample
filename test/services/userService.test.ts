import userService from '../../src/services/userService';
import userRepository from '../../src/repositories/userRepository';
import User from '../../src/models/user';

jest.mock('../../src/repositories/userRepository');

describe('UserService', () => {
  const name = 'John Doe';
  const email = 'john.doe@example.com';
  const user = new User(1, name, email, new Date());
  const users = [
    user,
    new User(2, 'Jane Smith', 'jane.smith@example.com', new Date())
  ];
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {

    (userRepository.createUser as jest.Mock).mockResolvedValue(user);

    const result = await userService.createUser(name, email);
    expect(result).toEqual(user);
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
  });

  it('should return a list of users', async () => {

    (userRepository.getUsers as jest.Mock).mockResolvedValue(users);

    const result = await userService.getUsers();
    expect(result).toEqual(users);
    expect(userRepository.getUsers).toHaveBeenCalledTimes(1);
  });

  it('should return a user by email', async () => {

    (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(user);

    const result = await userService.getUserByEmail(email);
    expect(result).toEqual(user);
    expect(userRepository.getUserByEmail).toHaveBeenCalledTimes(1);
  })
});
