import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Department } from 'src/app/departments/models/department.model';
import { DepartmentService } from 'src/app/departments/services/department.service';
import { Employee } from 'src/app/employees/models/employee.model';
import { EmployeeService } from 'src/app/employees/services/employee.service';
import { Equipment } from 'src/app/equipments/models/equipment.model';
import { EquipmentService } from 'src/app/equipments/services/equipment.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { Movement } from '../models/movements.model';
import { Requisition } from '../models/requisition.model';
import { RequisitionService } from '../services/requisition.service';

@Component({
  selector: 'app-department-requisitions',
  templateUrl: './department-requisitions.component.html'
})
export class DepartmentRequisitionsComponent implements OnInit {

  public requisitions$: Observable<Requisition[]>;
  public departments$: Observable<Department[]>;
  public equipments$: Observable<Equipment[]>;
  public form: FormGroup;

  public loggedEmployee: Employee;
  public selectedRequisition: Requisition;
  public statusList: string[] = ["Aberta", "Processando", "Não Autorizado", "Fechada"];

  private authenticatedProcess$: Subscription;

  constructor(
    private authService: AuthenticationService,
    private notifierService: NotifierService,
    private requisitionService: RequisitionService,
    private departmentService: DepartmentService,
    private equipmentService: EquipmentService,
    private employeeService: EmployeeService,
    private modalSerice: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      status: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(6)]),
      employee: new FormControl(),
      date: new FormControl()
    });

    this.authenticatedProcess$ = this.authService.authenticatedUser.subscribe(user => {
      const email: string = user?.email!;

      this.employeeService.getLoggedEmployee(email)
        .subscribe(employee => {
          this.loggedEmployee = employee;
          this.requisitions$ = this.requisitionService.getEmployeeDepartmentRequisitions(employee.departmentId);
        });
    });

    this.departments$ = this.departmentService.getAll();
    this.equipments$ = this.equipmentService.getAll();
  }

  ngOnDestroy(): void {
    this.authenticatedProcess$.unsubscribe();
  }

  get id(): AbstractControl | null {
    return this.form.get('id');
  }

  get description(): AbstractControl | null {
    return this.form.get('description');
  }

  get status(): AbstractControl | null {
    return this.form.get('status');
  }

  async save(modal: TemplateRef<any>, requisition: Requisition) {
    this.selectedRequisition = requisition;
    this.selectedRequisition.movements = requisition.movements ? requisition.movements : [];

    this.form.reset();
    this.form.patchValue({
      employee: this.loggedEmployee,
      status: this.selectedRequisition.status,
      date: new Date()
    });

    try {
      await this.modalSerice.open(modal).result;

      if (this.form.dirty && this.form.valid) {
        this.updateRequisition(this.form.value);
        await this.requisitionService.update(this.selectedRequisition);
        this.notifierService.success('Requisição atualizada com sucesso!');
      } else {
        this.notifierService.success('O formulário deve ser preenchido corretamente.');
      }
    } catch (err) {
      if (err != 'close' && err != 0 && err != 1) {
        this.notifierService.error('Erro ao executar ação.');
      }
    }
  }

  private updateRequisition(movement: Movement) {
    this.selectedRequisition.movements.push(movement);
    this.selectedRequisition.status = this.status?.value;
    this.selectedRequisition.lastUpdate = new Date();
  }
}
