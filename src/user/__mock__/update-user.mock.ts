import { UpdatePasswordDTO } from '../dto/update-password.dto';

export const updatePasswordMock: UpdatePasswordDTO = {
  lastPassword: '123',
  newPassword: 'abc',
};

export const updatePasswordInvalidMock: UpdatePasswordDTO = {
  lastPassword: 'XXX',
  newPassword: 'abc',
};
