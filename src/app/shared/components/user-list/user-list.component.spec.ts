import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserServiceInterface, USER_SERVICE } from "../../../core/services/user.service.interface";
import { MockUserService } from '../../../core/services/user.service.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';


describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: UserServiceInterface;
  let mockUsers: any[] = [];

  beforeEach(async () => {
    mockUserService = new MockUserService();
    mockUsers = [
      { name: 'John Doe', username: 'johndoe', email: 'john@example.com', address: '123 Main St' }
    ] as any

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: USER_SERVICE, useValue: mockUserService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should return a mock observable of users', () => {


    jest.spyOn( mockUserService, 'fetchUsers').mockReturnValue(of(mockUsers))
    mockUserService.fetchUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });
  });
});


