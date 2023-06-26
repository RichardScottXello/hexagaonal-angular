import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { UserMapper } from './user.mapper';

@Injectable()
export class ApiUsersAdapter {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(
    private http: HttpClient,
    private userMapper: UserMapper
  ) {}

  fetchUsers(): Observable<User[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((response: any[]) => response.map(userData => this.userMapper.mapFromApi(userData)))
    );
  }
}
