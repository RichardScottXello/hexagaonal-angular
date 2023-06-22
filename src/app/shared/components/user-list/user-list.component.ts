import { Component, Inject, OnInit } from '@angular/core';
import {
  USER_SERVICE,
  UserServiceInterface,
} from '../../../core/services/user.service.interface';
import { Observable } from 'rxjs';
import { UserTableDataSource } from 'src/app/core/services/user-ngrx-impl/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public vm$!: Observable<UserTableDataSource>;
  public displayedColumns: string[] = ['name', 'username', 'email', 'address'];
  constructor(@Inject(USER_SERVICE) private userService: UserServiceInterface) {}

  ngOnInit() {
    this.vm$ = this.userService.getViewModel();
  }
}
