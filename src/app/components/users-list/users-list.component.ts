import { Component } from '@angular/core';
import { last } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  public users: User[] = [];

  constructor(private userService: UserService) {
    this.getUsers();
  }

  private getUsers() {
    this.userService
      .findAll()
      .pipe(last())
      .subscribe((users) => {
        this.users = users;
      });
  }

  removeUser(id?: string) {
    this.userService
      .delete(id)
      .pipe(last())
      .subscribe(() => {
        this.users = this.users.filter((u) => u.id !== id);
      });
  }
}
