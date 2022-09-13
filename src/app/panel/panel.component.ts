import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';
import { EmployeeService } from '../employees/services/employee.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit, OnDestroy {
  public userName: string;
  private authenticatedUser$: Subscription;

  constructor(
    private authService: AuthenticationService,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authenticatedUser$ = this.authService.authenticatedUser.subscribe(user => {
      const email = user?.email!;

      if (email === "admin@gmail.com") {
        this.userName = "Administrador";
        return;
      } else {
        this.employeeService.getLoggedEmployee(email)
          .subscribe(employee => this.userName = employee.name);
      }
    });
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }

  public exit() {
    this.authService.logout().then(() => this.router.navigate(['/login']));
  }
}
