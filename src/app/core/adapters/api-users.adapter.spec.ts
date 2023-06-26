import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ApiUsersAdapter } from './api-users.adapter';
import { UserMapper } from './user.mapper';
import { Address, User } from '../models/user.model';

describe('ApiUsersAdapter', () => {
  let httpClient: HttpClient;
  let userMapper: UserMapper;
  let apiUsersAdapter: ApiUsersAdapter;

  beforeEach(() => {
    httpClient = {
      get: jest.fn(),
    } as any;

    userMapper = {
      mapFromApi: jest.fn(),
    } as any;

    apiUsersAdapter = new ApiUsersAdapter(httpClient, userMapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should retrieve users from the API and map them correctly', (done) => {
    const mockUserData: string | any[] = [

      {
        id: '1',
        name: 'bob',
        username: 'snazzy-bob',
        email: 'bob@bob.com',
        address: 'someplace 123',
        phone: '12345',
        website: 'coolbob.com',
        company: 'google',
      },
    ];

    const mockAddress: Address = {
      street: '123 Main St',
      city: 'Example City',
      suite: 'Example Ssdasd',
      zipcode: '12345',
      geo: { lat: '1', lng: '2' },
    };

    const mockMappedUser: User = {
      id: 1,
      name: 'sda',
      username: 'asd',
      email: 'asd',
      address: mockAddress,
      phone: '1234 ',
      website: 'asd',
      company: { name: 'foo', catchPhrase: 'bar', bs: 'laa' },
    } as User;

    (httpClient.get as jest.Mock).mockReturnValue(of(mockUserData));
    (userMapper.mapFromApi as jest.Mock).mockReturnValue(mockMappedUser);

    apiUsersAdapter.fetchUsers().subscribe((users: User[]) => {
      expect(httpClient.get).toHaveBeenCalledWith(apiUsersAdapter['apiUrl']);
      expect(userMapper.mapFromApi).toHaveBeenCalledTimes(mockUserData.length);
      expect(users).toEqual([mockMappedUser]); // Check if the mapped user is returned

      done();
    });
  });
});
