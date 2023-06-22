import { User } from './user.model';

export interface UserResponseModel {
  loading: boolean;
  error: string;
  users: User[];
}
