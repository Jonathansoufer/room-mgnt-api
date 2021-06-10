import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { User } from 'src/user/user.entity';

export const mockAddUserParams: CreateUserInput = {
  name: 'Jonathan',
  email: 'jon@gmail.com',
  password: 'test123',
  company: 'coke',
};

export const mockUpdateUserParams: UpdateUserInput = {
  id: '1',
  email: 'jon2@gmail.com',
};

export const mockUserModel: User = {
  id: '1',
  ...mockAddUserParams,
};

export const mockUpdateUserModel: User = {
  ...mockUserModel,
  email: 'updated-email@gmail.com',
};

export const mockUserArrayModel: User[] = [
  mockUserModel,
  {
    id: '2',
    name: 'TestUser',
    email: 'test-email@gmail.com',
    password: 'test-password',
    company: 'test-company',
  },
];
