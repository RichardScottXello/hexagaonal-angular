import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import {InjectionToken} from "@angular/core";
import { UserTableDataSource } from './user-ngrx-impl/user.service';
export const USER_SERVICE = new InjectionToken<UserServiceInterface>('UserServiceInterface');

export interface UserServiceInterface {
  fetchUsers(): Observable<User[]>;
  getViewModel():Observable<UserTableDataSource>
}
