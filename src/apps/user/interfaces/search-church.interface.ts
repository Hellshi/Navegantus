import { ChurchStatus } from '../../../apps/church/entities/church.entity';

export interface ChurchSearchInterface {
  id: string;
  name: string;
  address: string;
  status: ChurchStatus;
  churchSGUId: string;
  state: {
    id: string;
    name: string;
  };
  region: {
    id: string;
    name: string;
  };
  block: {
    id: string;
    name: string;
  };
}
