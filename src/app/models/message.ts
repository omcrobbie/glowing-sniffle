import { OctIcon } from '../utils/octicon.directive';

export class Message {
  constructor(
    public type: 'success' | 'error',
    private text?: string,
    private error?: Error,
    public autoDissmiss: boolean = true
  ) {}

  get content() {
    if (!this.error && this.text) {
      return this.text;
    }
    return this.type === 'success'
      ? 'Success!'
      : `An error has occurred:/n${this.error?.message}`;
  }

  get statusIcon(): OctIcon {
    return this.type === 'success'
      ? { key: 'check', color: 'green', size: 30 }
      : { key: 'x', color: 'red', size: 30 };
  }
}
