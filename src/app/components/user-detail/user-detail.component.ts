import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService
  ) {}
  user$: Observable<User> = this.activeRoute.paramMap.pipe(
    switchMap((params) => this.userService.findOne(params.get('id')!))
  );
}
