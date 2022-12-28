import { Component } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  public users$: Observable<User[]>;

  constructor(private userService: UserService) {
    this.users$ = this.userService.findAll();
  }

  removeUser(id?: string) {
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.users$ = this.users$.pipe(
          map((a) => a.filter((u) => u.id !== id))
        );
      });
  }
}
