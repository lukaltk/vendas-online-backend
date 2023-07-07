import { UserEntity } from '../entity/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 1,
  name: 'Test Mock',
  email: 'test.mock@email.com',
  password: 'password',
  cpf: '123456789-00',
  phone: '00912345678',
  typeUser: UserType.USER,
  addresses: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
