import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable()
export class UserMapper {
  mapFromApi(data: User): User {
    return {
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      address: data.address,
      phone: data.phone,
      website: data.website,
      company: data.company
    };
  }
}
