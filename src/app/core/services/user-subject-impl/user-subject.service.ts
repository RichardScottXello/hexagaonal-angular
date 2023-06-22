import { Injectable } from '@angular/core';
import { UserServiceInterface } from '../user.service.interface';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  of,
  switchMap,
} from 'rxjs';
import { User } from '../../models/user.model';

import { ApiUsersAdapter } from '../../adapters/api-users.adapter';
import { MatTableDataSource } from '@angular/material/table';
import { UserTableDataSource } from '../user-ngrx-impl/user.service';

@Injectable()
export class UserSubjectService implements UserServiceInterface {
  private userSubject: BehaviorSubject<Observable<User[]>> = new BehaviorSubject<Observable<User[]>>(of([]));
  public users$ = this.userSubject.asObservable();
  public vm$!: Observable<UserTableDataSource>;

  constructor(private apiUsersAdapter: ApiUsersAdapter) {


  }

  getUsers(): Observable<User[]> {
    this.userSubject.next(this.apiUsersAdapter.getUsers());
    return of([]);
  }

  getViewModel():Observable<UserTableDataSource> {

    this.vm$ = this.users$.pipe(
      switchMap((usersObservable: Observable<User[]>) => usersObservable),
      map((users: User[]) => {
        const dataSource = new MatTableDataSource<User>(users);
        const userTableDataSource: UserTableDataSource = {
          dataSource,
        };
        return userTableDataSource;
      })
    );
    return this.vm$;
  }
}
