import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';

import { User } from '../../models/user.model';
import { ApiUsersAdapter } from '../../adapters/api-users.adapter';
import { UserServiceInterface } from '../user.service.interface';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../../features/user/actions/user.actions';
import {
  selectError,
  selectLoading,
  selectUsers,
} from '../../../features/user/selectors/user.selectors';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

export interface UserTableDataSource {
  dataSource: MatTableDataSource<User>;
  loading?: boolean;
  error?: string | null
}

@Injectable()
export class UserNgrxService implements UserServiceInterface {
  private users$!: Observable<User[]>;
  private loading$!: Observable<boolean>;
  private error$!: Observable<string | null>
  private vm$!: Observable<UserTableDataSource>;

  constructor(private apiUsersAdapter: ApiUsersAdapter, private store: Store) {}

  fetchUsers(): Observable<User[]> {
    return this.apiUsersAdapter.getUsers();
  }

  getViewModel(): Observable<UserTableDataSource> {

    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.vm$ = combineLatest([this.users$, this.loading$, this.error$]).pipe(
      map(([users, loading, error]) => {
        const dataSource = new MatTableDataSource<User>(users);
        const userTableDataSource: UserTableDataSource = {
          dataSource,
           loading,
           error,
        };
        return userTableDataSource;
      })
    );
    this.store.dispatch(loadUsers());
    return this.vm$;
  }
}
