import pool from '../../src/config/database';
import userRepository from '../../src/repositories/userRepository';
import User from '../../src/models/user';

jest.mock('../../src/config/database');

describe('UserRepository', () => {
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

    (pool.query as jest.Mock).mockResolvedValue({ rows: [user] });

    const result = await userRepository.createUser(name, email);
    expect(result).toEqual(user);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it('should return a list of users', async () => {

    (pool.query as jest.Mock).mockResolvedValue({ rows: users });

    const result = await userRepository.getUsers();
    expect(result).toEqual(users);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it('should get user by email', async () => {

    (pool.query as jest.Mock).mockResolvedValue({ rows: [user] });

    const result = await userRepository.getUserByEmail(email);
    expect(result).toEqual(user);
    expect(pool.query).toHaveBeenCalledTimes(1);
  })
});
