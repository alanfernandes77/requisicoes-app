import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public formPasswordRecovery: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
    });

    this.formPasswordRecovery = this.formBuilder.group({
      emailToRecovery: new FormControl()
    });
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  get emailToRecovery(): AbstractControl | null {
    return this.formPasswordRecovery.get('emailToRecovery');
  }

  async login() {
    const email = this.email?.value;
    const password = this.password?.value;

    try {
      const response = await this.authService.authenticate(email, password);

      if (response?.user) {
        this.router.navigate(['/panel']);
      }
    } catch (err) {
      console.log(err);
    }
  }

  openRecoveryPasswordModal(modal: TemplateRef<any>) {
    this.modalService.open(modal)
      .result
      .then(result => {
        if (result === "send") {
          this.authService.resetPassword(this.emailToRecovery?.value);
        }
      })
      .catch(() => {
        this.formPasswordRecovery.reset();
      })
  }
}
