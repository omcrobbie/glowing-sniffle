import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, repeat, Subscription, switchMap, take, tap } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  private sub?: Subscription;

  constructor(public toastService: ToastService) {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.toastService.messages$
      .pipe(
        switchMap(() =>
          interval(3000).pipe(take(this.toastService.numMessages))
        )
      )
      .subscribe(() => this.toastService.removeMessage(0));
  }
}
