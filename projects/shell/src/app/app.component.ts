import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  public isAuthenticated$: Observable<boolean> = of(false);
  public name$: Observable<string> = of('');

  constructor() { }
}

