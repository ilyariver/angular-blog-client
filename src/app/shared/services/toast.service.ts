import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messages: ToastMessage[] = [];
  private toastSubject = new BehaviorSubject<ToastMessage[]>([]);
  toast$ = this.toastSubject.asObservable();
  private idCounter = 0;

  show(type: ToastMessage['type'], title: string, text: string) {
    const id = ++this.idCounter;
    const toast: ToastMessage = { id, type, title, text };
    this.messages = [...this.messages, toast];
    this.toastSubject.next(this.messages);

    setTimeout(() => this.remove(id), 5_000);
  }

  remove(id: number) {
    this.messages = this.messages.filter(t => t.id !== id);
    this.toastSubject.next(this.messages);
  }

  clear() {
    this.messages = [];
    this.toastSubject.next(this.messages);
  }
}
