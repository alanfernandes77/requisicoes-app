import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { NotifierService } from '../shared/services/notifier.service';
import { Department } from './models/department.model';
import { DepartmentService } from './services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit {
  departments$: Observable<Department[]>;
  form: FormGroup;

  constructor(
    private notifierService: NotifierService,
    private departmentService: DepartmentService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl(),
      phone: new FormControl(),
    });

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

  get phone() {
    return this.form.get('phone');
  }

  async save(modal: TemplateRef<any>, department?: Department) {
    this.form.reset();

    if (department) {
      this.form.setValue(department);
    }

    try {
      await this.modalService.open(modal).result;

      if (department) {
        await this.departmentService.update(this.form.value);
        this.notifierService.success('Departamento atualizado com sucesso!');
      } else {
        await this.departmentService.insert(this.form.value);
        this.notifierService.success('Departamento adicionado com sucesso!');
      }

    } catch (err) {
      if (err != 'close' && err != 0 && err != 1) {
        this.notifierService.error('Erro ao executar ação.');
      }
    }
  }

  async delete(department: Department) {
    this.departmentService.delete(department);
    this.notifierService.success('Departamento excluído com sucesso');
  }
}
