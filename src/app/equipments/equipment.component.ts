import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { NotifierService } from '../shared/services/notifier.service';
import { Equipment } from './models/equipment.model';
import { EquipmentService } from './services/equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
})
export class EquipmentComponent implements OnInit {
  equipments$: Observable<Equipment[]>;
  form: FormGroup;

  constructor(
    private notifierService: NotifierService,
    private equipmentService: EquipmentService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      serialNumber: new FormControl(),
      name: new FormControl(),
      price: new FormControl(),
      manufacturingDate: new FormControl(),
    });

    this.equipments$ = this.equipmentService.getAll();
  }

  get modalTitle(): string {
    return this.id?.value ? 'Atualização' : 'Cadastro';
  }

  get id() {
    return this.form.get('id');
  }

  get serialNumber() {
    return this.form.get('serialNumber');
  }

  get name() {
    return this.form.get('name');
  }

  get price() {
    return this.form.get('price');
  }

  get manufacturingDate() {
    return this.form.get('manufacturingDate');
  }

  async save(modal: TemplateRef<any>, equipment?: Equipment) {
    this.form.reset();

    if (equipment) {
      this.form.setValue(equipment);
    }

    try {
      await this.modalService.open(modal).result;

      if (equipment) {
        await this.equipmentService.update(this.form.value);
        this.notifierService.success('Equipamento atualizado com sucesso!');
      } else {
        await this.equipmentService.insert(this.form.value);
        this.notifierService.success('Equipamento adicionado com sucesso!');
      }
    } catch (err) {
      console.log(err);
      if (err != 'close' && err != 0 && err != 1) {
        this.notifierService.error('Erro ao executar ação.');
      }
    }
  }

  async delete(equipment: Equipment) {
    this.equipmentService.delete(equipment);
    this.notifierService.success('Equipamento excluído com sucesso');
  }
}
