import { MatTableDataSource } from "@angular/material/table";
import { Observable, combineLatest, map, of } from "rxjs";
import { User } from "../models/user.model";
import { UserTableDataSource } from "./user-ngrx-impl/user.service";
import { UserServiceInterface } from "./user.service.interface";

export class MockUserService implements UserServiceInterface {
  loading = [false]
  error = ['error'];
  viewModel: any;

  getViewModel(): Observable<UserTableDataSource> {
     const mockUsers = [ { name: 'John Doe', username: 'johndoe', email: 'john@example.com', address: '123 Main St' }] as any[];
     let userTableDataSource: UserTableDataSource = {}  as UserTableDataSource
     this.viewModel = combineLatest([mockUsers, this.loading, this.error]).pipe(
       map(([users, loading, error]) => {
         const dataSource = new MatTableDataSource<User>(users);
          userTableDataSource = {
           dataSource,
           loading,
           error,
         };

       }))
       return of(userTableDataSource);
  }

  fetchUsers(): Observable<User[]> {
    // Mock implementation for loadUsers
    const mockUsers = [ { name: 'John Doe', username: 'johndoe', email: 'john@example.com', address: '123 Main St' }] as any[];
    return of(mockUsers)
  }

  vm$: Observable<UserTableDataSource> = of({
    dataSource: new MatTableDataSource<User>([]),
    loading: false,
    error: null,
  });
}
