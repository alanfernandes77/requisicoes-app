import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit, OnDestroy {
  userEmail?: string | null;

  authenticatedUser$: Subscription;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticatedUser$ = this.authService.authenticatedUser.subscribe(
      (user) => (this.userEmail = user?.email)
    );
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }

  public exit() {
    this.authService.logout().then(() => this.router.navigate(['/login']));
  }
}
