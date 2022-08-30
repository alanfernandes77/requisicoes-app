import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DepartmentComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    DepartmentRoutingModule,
    NgxMaskModule.forChild(),
    SharedModule
  ]
})
export class DepartmentModule {}
