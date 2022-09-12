import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Department } from 'src/app/departments/models/department.model';
import { DepartmentService } from 'src/app/departments/services/department.service';
import { EmployeeService } from 'src/app/employees/services/employee.service';
import { Equipment } from 'src/app/equipments/models/equipment.model';
import { EquipmentService } from 'src/app/equipments/services/equipment.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { Requisition } from '../models/requisition.model';
import { RequisitionService } from '../services/requisition.service';

@Component({
  selector: 'app-employee-requisitions',
  templateUrl: './employee-requisitions.component.html'
})
export class EmployeeRequisitionsComponent implements OnInit, OnDestroy {
  public requisitions$: Observable<Requisition[]>;
  public departments$: Observable<Department[]>;
  public equipments$: Observable<Equipment[]>;
  public form: FormGroup;
  public loggedEmployeeId: string;

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
      id: new FormControl(),
      creationDate: new FormControl(),
      description: new FormControl('', [Validators.required]),

      employeeId: new FormControl(),
      employee: new FormControl(),

      departmentId: new FormControl(),
      department: new FormControl(),

      equipmentId: new FormControl(),
      equipment: new FormControl(),

      status: new FormControl(),
      lastUpdate: new FormControl(),
      movements: new FormControl(),
    });

    this.authenticatedProcess$ = this.authService.authenticatedUser.subscribe(user => {
      const email: string = user?.email!;

      this.employeeService.getLoggedEmployee(email)
        .subscribe(employee => {
          this.loggedEmployeeId = employee.id;
          this.requisitions$ = this.requisitionService.getEmployeeRequisitions(this.loggedEmployeeId);
        });
    });

    this.departments$ = this.departmentService.getAll();
    this.equipments$ = this.equipmentService.getAll();
  }

  ngOnDestroy(): void {
    this.authenticatedProcess$.unsubscribe();
  }

  get modalTitle(): string {
    return this.id?.value ? 'Atualização' : 'Cadastro';
  }

  get id(): AbstractControl | null {
    return this.form.get('id');
  }

  get creationDate(): AbstractControl | null {
    return this.form.get('creationDate');
  }

  get department(): AbstractControl | null {
    return this.form.get('department');
  }

  get description(): AbstractControl | null {
    return this.form.get('description');
  }

  get equipment(): AbstractControl | null {
    return this.form.get('equipment');
  }

  async save(modal: TemplateRef<any>, requisition?: Requisition) {
    this.form.reset();

    this.form.get('status')?.setValue('Aberto');
    this.form.get('creationDate')?.setValue(new Date());
    this.form.get('lastUpdate')?.setValue(new Date());
    this.form.get('equipmentId')?.setValue(null);
    this.form.get('employeeId')?.setValue(this.loggedEmployeeId);

    if (requisition) {
      const department = requisition.department ? requisition.department : null;
      const equipment = requisition.equipment ? requisition.equipment : null;
      const employee = requisition.employee ? requisition.employee : null;
      const fullRequisition = {
        ...requisition,
        department,
        equipment,
        employee
      };

      this.form.setValue(fullRequisition);
    }

    try {
      await this.modalSerice.open(modal).result;

      if (this.form.dirty && this.form.valid) {
        if (requisition) {
          await this.requisitionService.update(this.form.value);
          this.notifierService.success('Requisição atualizada com sucesso!');
        } else {
          await this.requisitionService.insert(this.form.value);
          this.notifierService.success('Requisição adicionada com sucesso!');
        }
      } else {
        this.notifierService.success('O formulário deve ser preenchido corretamente.'
        );
      }
    } catch (err) {
      if (err != 'close' && err != 0 && err != 1) {
        this.notifierService.error('Erro ao executar ação.');
      }
    }
  }

  async delete(requisition: Requisition) {
    try {
      this.requisitionService.delete(requisition);
      this.notifierService.success('Requisição excluída com sucesso.');
    } catch (error) {
      this.notifierService.error('Erro ao deletar requisição.');
    }
  }

}
