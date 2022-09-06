import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';
import { Department } from '../departments/models/department.model';
import { DepartmentService } from '../departments/services/department.service';
import { NotifierService } from '../shared/services/notifier.service';
import { Employee } from './models/employee.model';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  employees$: Observable<Employee[]>;
  departments$: Observable<Department[]>;
  form: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private notifierService: NotifierService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      employee: new FormGroup({
        id: new FormControl(),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        function: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        departmentId: new FormControl(),
        department: new FormControl(),
      }),
      password: new FormControl()
    });

    this.employees$ = this.employeeService.getAll();
    this.departments$ = this.departmentService.getAll();
  }

  get modalTitle(): string {
    return this.id?.value ? 'Atualização' : 'Cadastro';
  }

  get id(): AbstractControl | null {
    return this.form.get('employee.id');
  }

  get name(): AbstractControl | null {
    return this.form.get('employee.name');
  }

  get function(): AbstractControl | null {
    return this.form.get('employee.function');
  }

  get email(): AbstractControl | null {
    return this.form.get('employee.email');
  }

  get department(): AbstractControl | null {
    return this.form.get('employee.department');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  async save(modal: TemplateRef<any>, employee?: Employee) {
    this.form.reset();

    if (employee) {
      const department = employee.department ? employee.department : null;
      const fullEmployee = {
        ...employee,
        department,
      };

      this.form.get('employee')?.setValue(fullEmployee);
    }

    try {
      await this.modalService.open(modal).result;

      if (this.form.dirty && this.form.valid) {
        if (employee) {
          await this.employeeService.update(this.form.get('employee')?.value);
          this.notifierService.success('Funcionário atualizado com sucesso!');
        } else {
          const currentUser = this.authService.getUser();

          await this.authService.register(this.email?.value, this.password?.value);
          await this.employeeService.insert(this.form.get('employee')?.value);
          await this.authService.updateUser(await currentUser);

          this.notifierService.success('Funcionário adicionado com sucesso!');
        }
      } else {
        this.notifierService.error('O formulário deve ser preenchido corretamente.'
        );
      }
    } catch (err) {
      if (err != 'close' && err != 0 && err != 1) {
        this.notifierService.error('Erro ao executar ação.');
      }
    }
  }

  async delete(employee: Employee) {
    try {
      this.employeeService.delete(employee);
      this.notifierService.success('Funcionário excluído com sucesso.');
    } catch (error) {
      this.notifierService.error('Erro ao deletar funcionário.');
    }
  }
}
