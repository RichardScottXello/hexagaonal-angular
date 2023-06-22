import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import * as UserActions from '../actions/user.actions';
import { USER_SERVICE, UserServiceInterface } from '../../../core/services/user.service.interface';
import { MockUserService } from '../../../core/services/user.service.mock';

describe('UserEffects', () => {
  let userEffects: UserEffects;
  let actions$: Observable<any>;
  let userServiceMock: Partial<UserServiceInterface>;
  let mockUserService = new MockUserService();
  beforeEach(() => {
    userServiceMock = {
      getViewModel: jest.fn(),

    };

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        { provide: USER_SERVICE, useValue: mockUserService }
      ],
    });

    userEffects = TestBed.inject(UserEffects);
  });

  it('should dispatch loadUsersSuccess action on successful API call', () => {
    const mockUsers = [{ name: 'John Doe', username: 'johndoe', email: 'john@example.com', address: '123 Main St' }] as any;
    userServiceMock.getViewModel = jest.fn().mockReturnValue(of(mockUsers));

    actions$ = of(UserActions.loadUsers());

    userEffects.loadUsers$.subscribe((resultAction) => {
      expect(resultAction).toEqual(UserActions.loadUsersSuccess({ users: mockUsers }));
    });
  });

  it('should dispatch loadUsersFailure action on API call error', () => {
    const mockError = new Error('API error');
    userServiceMock.getViewModel= jest.fn().mockReturnValue(throwError(mockError));

    actions$ = of(UserActions.loadUsers());

    userEffects.loadUsers$.subscribe((resultAction) => {
      expect(resultAction).toEqual(UserActions.loadUsersFailure({ error: mockError }));
    });
  });
});
