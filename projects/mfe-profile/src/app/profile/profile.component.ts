import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent {
  public profile$ = this.oktaStateService.authState$.pipe(
      filter(state => !!state && !!state.isAuthenticated),
      map(state => state.idToken?.claims)
  );

  public date$ = this.oktaStateService.authState$.pipe(
      filter(state => !!state && !!state.isAuthenticated),
      map(state => (state.idToken?.claims.auth_time as number) * 1000),
      map(epochTime => new Date(epochTime)),
  );

  constructor(private oktaStateService: OktaAuthStateService) { }
}
