import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private activeSessions: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);
  isLoad$ = this.activeSessions.asObservable().pipe(map(d => {
    return d.length > 0;
  }));

  constructor() { }

  start(req: HttpRequest<any>):void {
    this.activeSessions.next(this.activeSessions.value.concat(req.url));
  }

  stop(req: HttpRequest<any>):void {
    if (this.activeSessions.value.length > 1) {
      this.activeSessions.next(this.activeSessions.value.filter(v => v != req.url));
    } else
        this.activeSessions.next([]);
  }
}
