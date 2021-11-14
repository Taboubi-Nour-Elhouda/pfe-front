import { Injectable,OnDestroy } from '@angular/core';
import { Subject,  BehaviorSubject } from 'rxjs';
import {Observable} from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  public BehaviorSubject$: BehaviorSubject<string>= new BehaviorSubject<string>('burger');

  constructor() {}

  sendMessage(message: string) {
    this.BehaviorSubject$.next(message);
    console.log('update to :', message);
  }

  receivedMessage(): Observable<string> {
    console.log(this.BehaviorSubject$.asObservable());
    return this.BehaviorSubject$.asObservable();
  }

}
