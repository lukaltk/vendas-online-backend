import { LoginDto } from '../dto/login.dto';
import { userEntityMock } from '../../user/__mock__/user.mock';

export const loginUserMock: LoginDto = {
  email: userEntityMock.email,
  password: '123',
};
