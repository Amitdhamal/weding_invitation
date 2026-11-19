import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  marriageOver = new BehaviorSubject<boolean>(false);
  constructor() { }

  sendMarriageOver(value: boolean) {
    this.marriageOver.next(value);
  }
}
