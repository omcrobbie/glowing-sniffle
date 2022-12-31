import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public messages: Message[] = [];
  messages$: Subject<Message[]> = new Subject();

  get numMessages() {
    return this.messages.length;
  }
  addMessage(message: Message) {
    this.messages.push(message);
    this.messages$.next(this.messages);
  }

  removeMessage(index: number) {
    if (this.messages.length) {
      this.messages.splice(index, 1);
    }
  }
}
