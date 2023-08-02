import { AddressEntity } from '../entity/address.entity';
import { cityMock } from '../../city/__mock__/city.mock';
import { userEntityMock } from '../../user/__mock__/user.mock';

export const addressMock: AddressEntity = {
  id: 1,
  cep: '1',
  numberAddress: 1,
  complement: 'complement',
  userId: userEntityMock.id,
  cityId: cityMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
