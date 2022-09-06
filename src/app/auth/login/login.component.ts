import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public formPasswordRecovery: FormGroup;

  constructor(
    private notifierService: NotifierService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.formPasswordRecovery = this.formBuilder.group({
      emailToRecovery: new FormControl('', [Validators.required, Validators.email])
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
    } catch (_err) {
      this.notifierService.error('Usuário não encontrado.');
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
