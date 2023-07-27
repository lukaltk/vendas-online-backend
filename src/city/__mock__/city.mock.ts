import { CityEntity } from '../entity/city.entity';
import { stateMock } from '../../state/__mock__/state.mock';

export const cityMock: CityEntity = {
  id: 1,
  name: 'State Mock',
  stateId: stateMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
