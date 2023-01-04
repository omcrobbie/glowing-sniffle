import { Component, OnInit } from '@angular/core';
import { catchError, last, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public users: User[] = [];
  public debug = false;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.userService
      .findAll()
      .pipe(
        last(),
        catchError(() => of([]))
      )
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
