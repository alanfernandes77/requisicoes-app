import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { NotifierService } from '../shared/services/notifier.service';
import { futureDateValidator } from '../shared/validators/future-date.validator';
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
      serialNumber: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required]),
      manufacturingDate: new FormControl('', [Validators.required, futureDateValidator()]),
    });

    this.equipments$ = this.equipmentService.getAll();
  }

  get modalTitle(): string {
    return this.id?.value ? 'Atualização' : 'Cadastro';
  }

  get id(): AbstractControl | null {
    return this.form.get('id');
  }

  get serialNumber(): AbstractControl | null {
    return this.form.get('serialNumber');
  }

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

  get price(): AbstractControl | null {
    return this.form.get('price');
  }

  get manufacturingDate(): AbstractControl | null {
    return this.form.get('manufacturingDate');
  }

  async save(modal: TemplateRef<any>, equipment?: Equipment) {
    this.form.reset();

    if (equipment) {
      this.form.setValue(equipment);
    }

    try {
      await this.modalService.open(modal).result;

      if (this.form.dirty && this.form.valid) {
        if (equipment) {
          await this.equipmentService.update(this.form.value);
          this.notifierService.success('Equipamento atualizado com sucesso!');
        } else {
          await this.equipmentService.insert(this.form.value);
          this.notifierService.success('Equipamento adicionado com sucesso!');
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

  async delete(equipment: Equipment) {
    try {
      this.equipmentService.delete(equipment);
      this.notifierService.success('Equipamento excluído com sucesso');
    } catch (error) {
      this.notifierService.error('Erro ao deletar equipamento.');
    }
  }
}
