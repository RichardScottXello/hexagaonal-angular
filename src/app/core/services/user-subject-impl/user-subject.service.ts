import {Injectable} from '@angular/core';
import {UserServiceInterface} from '../user.service.interface';
import {BehaviorSubject, finalize, map, Observable, of, tap,} from 'rxjs';
import {User} from '../../models/user.model';

import {ApiUsersAdapter} from '../../adapters/api-users.adapter';
import {MatTableDataSource} from '@angular/material/table';
import {UserTableDataSource} from '../user-ngrx-impl/user.service';
import {catchError} from "rxjs/operators";

@Injectable()
export class UserSubjectService implements UserServiceInterface {
  public vm$!: Observable<UserTableDataSource>;
  private userSubject: BehaviorSubject<Observable<User[]>> = new BehaviorSubject<Observable<User[]>>(of([]));
  private loading!: boolean;
  private error!: string | null;

  constructor(private apiUsersAdapter: ApiUsersAdapter) {
  }

  fetchUsers(): Observable<User[]> {
    const loadingSubject = new BehaviorSubject<boolean>(true);
    const errorSubject = new BehaviorSubject<string | null>(null);
    const users$ = this.apiUsersAdapter.fetchUsers().pipe(
      tap(() => {
        loadingSubject.next(false); // Set loading to false when data is received
      }),
      catchError((error: string) => {
        errorSubject.next(`An error occurred. ${error}`);
        return of([]);
      }),
      finalize(() => {
        loadingSubject.complete();
      })
    );

    this.loading = loadingSubject.getValue();
    this.error = errorSubject.getValue();
    this.userSubject.next(users$);
    return users$;
  }

  getViewModel(): Observable<UserTableDataSource> {
    this.vm$ = this.fetchUsers().pipe(
      map((users: User[]) => {
        const dataSource = new MatTableDataSource<User>(users);
        const userTableDataSource: UserTableDataSource = {
          dataSource,
        };
        return userTableDataSource;
      }),
      tap((userTableDataSource: UserTableDataSource) => {

        userTableDataSource.loading = this.loading;
        userTableDataSource.error = this.error;
      })
    );
    return this.vm$;
  }
}
