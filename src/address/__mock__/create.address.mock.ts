import { CreateAddressDto } from '../dto/createAddress.dto';
import { addressMock } from './address.mock';

export const creatAddressMock: CreateAddressDto = {
  cep: addressMock.cep,
  numberAddress: addressMock.numberAddress,
  complement: addressMock.complement,
  cityId: addressMock.id,
};
