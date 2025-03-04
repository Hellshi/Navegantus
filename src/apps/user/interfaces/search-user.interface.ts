import { UserStatus } from '../enums/user-status.enum';

export interface UserSearchInterface {
  id: string;
  email: string;
  name: string;
  status: UserStatus;
  lastLogin?: Date;
  createdAt: Date;
  church?: {
    id: string;
    name: string;
  };
  region?: {
    id: string;
    name: string;
  };
  block?: {
    id: string;
    name: string;
  };
  state?: {
    id: string;
    name: string;
  };
  role?: {
    id: string;
    name: string;
  };
}
