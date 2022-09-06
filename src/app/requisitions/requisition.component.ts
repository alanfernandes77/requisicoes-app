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
import { Equipment } from '../equipments/models/equipment.model';
import { EquipmentService } from '../equipments/services/equipment.service';
import { NotifierService } from '../shared/services/notifier.service';
import { Requisition } from './models/requisition.model';
import { RequisitionService } from './services/requisition.service';

@Component({
  selector: 'app-requisition',
  templateUrl: './requisition.component.html',
})
export class RequisitionComponent implements OnInit {
  requisitions$: Observable<Requisition[]>;
  departments$: Observable<Department[]>;
  equipments$: Observable<Equipment[]>;
  form: FormGroup;

  constructor(
    private notifierService: NotifierService,
    private requisitionService: RequisitionService,
    private departmentService: DepartmentService,
    private equipmentService: EquipmentService,
    private modalSerice: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      creationDate: new FormControl(),
      department: new FormControl(),
      departmentId: new FormControl(),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      equipment: new FormControl(),
      equipmentId: new FormControl(),
    });

    this.requisitions$ = this.requisitionService.getAll();
    this.departments$ = this.departmentService.getAll();
    this.equipments$ = this.equipmentService.getAll();
  }

  get modalTitle(): string {
    return this.id?.value ? 'Atualização' : 'Cadastro';
  }

  get id() {
    return this.form.get('id');
  }

  get creationDate() {
    return this.form.get('creationDate');
  }

  get department() {
    return this.form.get('department');
  }

  get description() {
    return this.form.get('description');
  }

  get equipment() {
    return this.form.get('equipment');
  }

  async save(modal: TemplateRef<any>, requisition?: Requisition) {
    this.form.reset();

    if (requisition) {
      const department = requisition.department ? requisition.department : null;
      const equipment = requisition.equipment ? requisition.equipment : null;
      const fullRequisition = {
        ...requisition,
        department,
        equipment,
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
