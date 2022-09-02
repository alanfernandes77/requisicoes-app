import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public authenticatedUser: Observable<firebase.User | null>;
  public isCollapsed: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticatedUser = this.authService.authenticatedUser;
  }

  public exit() {
    this.authService.logout().then(() => this.router.navigate(['/login']));
  }
}
