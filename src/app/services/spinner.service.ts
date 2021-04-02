import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  visible: BehaviorSubject<boolean>;

  constructor() {
    this.visible = new BehaviorSubject<boolean>(false);
  }

  show = () => this.visible.next(true);

  hide = () => this.visible.next(false);
}
