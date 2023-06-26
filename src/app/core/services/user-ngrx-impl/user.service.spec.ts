import { loadUsers } from '../../../features/user/actions/user.actions';
import { of } from 'rxjs';
import { UserNgrxService } from './user.service';

describe('User Service', () => {
  let service: UserNgrxService;
  let storeMock: any;
  let apiUsersAdapterMock: any

  beforeEach(() => {
    storeMock = {
      dispatch: jest.fn(),
      select: jest.fn(),
    } as any;
    apiUsersAdapterMock = {
      fetchUsers: jest.fn().mockReturnValue(of([])),
    };
    service = new UserNgrxService(apiUsersAdapterMock, storeMock);
  });

  it('should call getUsers method of apiUsersAdapter', () => {
    service.fetchUsers().subscribe(() => {
      expect(apiUsersAdapterMock
        .getUsers).toHaveBeenCalled();
    });
  });

  it('should dispatch loadUsers action', () => {
    service.getViewModel();
    expect(storeMock.dispatch).toHaveBeenCalledWith(loadUsers());
  })

  ;
});
