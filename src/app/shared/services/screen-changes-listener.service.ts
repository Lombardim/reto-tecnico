import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenChangesListenerService {
  public globalScreenSize: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public screenSize: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public screenHeight: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }
}
