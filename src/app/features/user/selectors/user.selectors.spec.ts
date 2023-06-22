import { Address, User } from 'src/app/core/models/user.model';
import {
  selectUserState,
  selectUsers,
  selectLoading,
  selectError,
} from './user.selectors';

describe('NgRx Selectors', () => {
  const mockAddress: Address = {
    street: '123 Main St',
    city: 'Example City',
    suite: 'Example Ssdasd',
    zipcode: '12345',
    geo: { lat: '1', lng: '2' },
  };

  const mockState = {
    user: {
      users: [
        {
          id: 1,
          name: 'sda',
          username: 'asd',
          email: 'asd',
          address: mockAddress,
          phone: '1234 ',
          website: 'asd',
          company: { name: 'foo', catchPhrase: 'bar', bs: 'laa' },
        } as User,
      ],
      loading: true,
      error: null,
    },
  };

  it('should select the user state', () => {
    const selectedState = selectUserState.projector(mockState.user);
    expect(selectedState).toEqual(mockState.user);
  });

  it('should select the users', () => {
    const selectedUsers = selectUsers.projector(mockState.user);
    expect(selectedUsers).toEqual(mockState.user.users);
  });

  it('should select the loading state', () => {
    const selectedLoading = selectLoading.projector(mockState.user);
    expect(selectedLoading).toBe(true);
  });

  it('should select the error state', () => {
    const selectedError = selectError.projector(mockState.user);
    expect(selectedError).toBeNull();
  });
});
