import { Component } from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Breadcrumb} from '../models/breadcrumb.model';
import {Observable} from 'rxjs';
import {BreadcrumbService} from '../services/breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  template: `
    @if (breadcrumbs$ | async; as breadcrumbs) {
      <ul class="breadcrumbs">
        @for (crumb of breadcrumbs; track crumb; let last = $last) {
          <li class="breadcrumbs__item">
            @if (!last) {
              <a class="breadcrumbs__link" [routerLink]="crumb.url">{{ crumb.label }}</a>
              <span> / </span>
            } @else if (last) {
              <span>{{ crumb.label }}</span>
            }
          </li>
        }
      </ul>
    }
  `,
  imports: [
    AsyncPipe,
    RouterLink,
  ],
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
  }
}
