import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ApiUsersAdapter } from '../../core/adapters/api-users.adapter';
import { UserMapper } from '../../core/adapters/user.mapper';

import {userReducer} from "./reducers/user.reducer";
import {UserEffects} from "./effects/user.effects";
import {UserListComponent} from "../../shared/components/user-list/user-list.component";
import {SharedModule} from "../../shared/shared.module";
import {USER_SERVICE} from "../../core/services/user.service.interface";
import { UserNgrxService } from 'src/app/core/services/user-ngrx-impl/user.service';
import { UserSubjectService } from '../../core/services/user-subject-impl/user-subject.service';

/**
 *
 * To change our concrete implementation, we only need to change the useClass
 * property in providers to the implmentation service we want
 */

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
    ApiUsersAdapter,
    UserMapper,
    { provide: USER_SERVICE, useClass: UserSubjectService }
  ],
  exports: [
    UserListComponent
  ]
})
export class UserModule {}
