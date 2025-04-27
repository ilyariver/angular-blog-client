import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastMessage, ToastService} from '../../services/toast.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toastr-container">
      @for (toast of toasts;track toast) {
        <div
          [@fadeSlide]
          class="toastr"
          [ngClass]="toast.type"
          (click)="dismiss(toast.id)">
          <strong>{{ toast.title }}</strong>
          <div>{{ toast.text }}</div>
        </div>
      }
    </div>
  `,
  styles: [`
    .toastr-container {
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 10000;
    }
    .toastr {
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      cursor: pointer;
    }
    .toastr strong {
      display: block;
      margin-bottom: 5px;
    }
    .success { background-color: #28a745; }
    .error { background-color: #dc3545; }
    .info { background-color: #17a2b8; }
    .warning { background-color: #ffc107; color: #333; }
  `],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class ToastComponent {
  toasts: ToastMessage[] = [];

  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe(messages => this.toasts = messages);
  }

  dismiss(id: number) {
    this.toastService.remove(id);
  }
}
