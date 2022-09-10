import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisitionRoutingModule } from './requisition-routing.module';
import { RequisitionComponent } from './requisition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RequisitionService } from './employee-requisitions/services/employee-requisition.service';
import { EmployeeRequisitionsComponent } from './employee-requisitions/employee-requisitions.component';
import { DepartmentRequisitionsComponent } from './department-requisitions/department-requisitions.component';

@NgModule({
  declarations: [RequisitionComponent, EmployeeRequisitionsComponent, DepartmentRequisitionsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    RequisitionRoutingModule,
  ],
  providers: [RequisitionService],
})
export class RequisitionModule { }
