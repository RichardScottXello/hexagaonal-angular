import { TestBed } from '@angular/core/testing';
import { UserSubjectService } from './user-subject.service';
import { UserServiceInterface } from '../user.service.interface';
import { of } from 'rxjs';
import { User } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { UserTableDataSource } from '../user-ngrx-impl/user.service';
import { InjectionToken } from '@angular/core';
import { ApiUsersAdapter } from '../../adapters/api-users.adapter';

jest.mock('../user.service.interface');

const USER_SERVICE = new InjectionToken<UserServiceInterface>(
  'UserServiceInterface'
);

describe('UserSubjectService', () => {
  let service: UserSubjectService;
  let userServiceMock: jest.Mocked<UserServiceInterface>;
  let apiUsersAdapter: ApiUsersAdapter;

  beforeEach(() => {
    userServiceMock = {
      getUsers: jest.fn(),
      getViewModel: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        UserSubjectService,
        { provide: USER_SERVICE, useValue: userServiceMock },
        { provide: ApiUsersAdapter, useValue: apiUsersAdapter },
      ],
    });

    service = TestBed.inject(UserSubjectService);
  });

  it('should create the view model with the correct data source', () => {
    const mockUsers: any[] = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];

    userServiceMock.getUsers.mockReturnValue(of(mockUsers));

    service.getViewModel().subscribe((viewModel) => {
      const dataSource = new MatTableDataSource<User>(mockUsers);
      const expectedViewModel: UserTableDataSource = {
        dataSource,
      };

      expect(viewModel).toEqual(expectedViewModel); // Assert the view model
      expect(userServiceMock.getUsers).toHaveBeenCalled();
      expect(userServiceMock.getViewModel).toHaveBeenCalled();
    });
  });
});
