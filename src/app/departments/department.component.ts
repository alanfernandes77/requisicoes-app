import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
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
    private departmentService: DepartmentService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.departments$ = this.departmentService.getAll();

    this.form = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl(),
      phone: new FormControl(),
    });
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
      } else {
        await this.departmentService.insert(this.form.value);
      }

      console.log('departamento salvo com sucesso');
    } catch (_err) {}
  }

  async delete(department: Department) {
    this.departmentService.delete(department);
  }
}
