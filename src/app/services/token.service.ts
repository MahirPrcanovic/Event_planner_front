import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  admin = new Subject<boolean>();
  constructor() {}
}
