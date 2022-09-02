import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
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
    private notifierService: NotifierService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      function: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      departmentId: new FormControl(),
      department: new FormControl(),
    });

    this.employees$ = this.employeeService.getAll();
    this.departments$ = this.departmentService.getAll();
  }

  get modalTitle(): string {
    return this.id?.value ? 'Atualização' : 'Cadastro';
  }

  get id() {
    return this.form.get('id');
  }

  get name() {
    return this.form.get('name');
  }

  get function() {
    return this.form.get('function');
  }

  get email() {
    return this.form.get('email');
  }

  get department() {
    return this.form.get('department');
  }

  async save(modal: TemplateRef<any>, employee?: Employee) {
    this.form.reset();

    if (employee) {
      const department = employee.department ? employee.department : null;
      const fullEmployee = {
        ...employee,
        department,
      };

      this.form.setValue(fullEmployee);
    }

    try {
      await this.modalService.open(modal).result;

      if (this.form.dirty && this.form.valid) {
        if (employee) {
          await this.employeeService.update(this.form.value);
          this.notifierService.success('Funcionário atualizado com sucesso!');
        } else {
          await this.employeeService.insert(this.form.value);
          this.notifierService.success('Funcionário adicionado com sucesso!');
        }
      } else {
        this.notifierService.error('O formulário deve ser preenchido corretamente.');
      }
    } catch (err) {
      console.log(err);
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
