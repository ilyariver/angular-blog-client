import { Component } from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { LoaderService } from "./loader.service";
import { Observable } from "rxjs";
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  standalone: true,
  imports: [
    MatProgressSpinner,
    AsyncPipe
  ],
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  isLoad: Observable<boolean>

  constructor (private loaderService: LoaderService) {
    this.isLoad = loaderService.isLoad$;
  }
}
