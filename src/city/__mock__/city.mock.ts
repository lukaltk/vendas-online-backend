import { CityEntity } from '../entity/city.entity';
import { stateMock } from '../../state/__mock__/state.mock';

export const cityMock: CityEntity = {
  id: 1,
  name: 'City Mock',
  stateId: stateMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
