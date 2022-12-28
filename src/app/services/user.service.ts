import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, tap } from 'rxjs';
import { User } from '../models/user';
import { ToastService } from './toast.service';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl: string;

  constructor(private http: HttpClient, private toastService: ToastService) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap({
        next: () => this.handleSuccess('Fetched all users!'),
        error: (err) => this.handleError('Failed to fetch all', err),
      })
    );
  }

  findOne(id: string) {
    return this.http.get<User>(`${this.usersUrl}/${id}`).pipe(
      tap({
        next: (user) => this.handleSuccess(`Fetched ${user.name}`),
        error: () => this.handleError('Failed to fetch one'),
      })
    );
  }

  save(user: User) {
    return this.http.post(this.usersUrl, user);
  }
  private handleSuccess(content: string) {
    this.toastService.addMessage(new Message('success', content));
  }

  private handleError(content: string, err: Error = new Error()) {
    this.toastService.addMessage(new Message('error', content, err));
  }

  update(id: string, user: User) {
    return this.http.put<User>(`${this.usersUrl}/${id}`, user).pipe(
      tap({
        next: () => this.handleSuccess(`Sucessfully updated id ${user.id}`),
        error: (err) => this.handleError(`Failed to update id ${user.id}`, err),
      })
    );
  }
  delete(id?: string) {
    return this.http.delete(`${this.usersUrl}/${id}`).pipe(
      tap({
        next: () => this.handleSuccess(`Successfully deleted id ${id}`),
        error() {
          throw new DOMException('you suck');
        },
      })
    );
  }
}
