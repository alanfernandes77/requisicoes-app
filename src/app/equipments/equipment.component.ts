import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
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
    private equipmentService: EquipmentService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.equipments$ = this.equipmentService.getAll();

    this.form = this.formBuilder.group({
      id: new FormControl(),
      serialNumber: new FormControl(),
      name: new FormControl(),
      price: new FormControl(),
      manufacturingDate: new FormControl()
    })
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
    return this.form.get('manufacturingDate')
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
      } else {
        await this.equipmentService.insert(this.form.value);
      }

      console.log('equipamento salvo com sucesso');
    } catch (_err) {}
  }

  async delete(equipment: Equipment) {
    this.equipmentService.delete(equipment);
  }
}
