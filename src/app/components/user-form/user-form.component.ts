import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  user: User = new User();
  @Input() userDefault: User | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.userDefault) {
      this.user = this.userDefault;
    }
  }

  onSubmit() {
    let obs = this.userService.save(this.user);
    if (this.userDefault) {
      obs = this.userService.update(this.user.id!, this.user);
    }
    firstValueFrom(obs).then(() => this.gotoUserList());
  }

  private gotoUserList() {
    this.router.navigate(['/users']);
  }
}
