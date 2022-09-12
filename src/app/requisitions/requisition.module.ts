import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisitionRoutingModule } from './requisition-routing.module';
import { RequisitionComponent } from './requisition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RequisitionService } from './services/requisition.service';
import { EmployeeRequisitionsComponent } from './employee-requisitions/employee-requisitions.component';
import { DepartmentRequisitionsComponent } from './department-requisitions/department-requisitions.component';
import { DetailsComponent } from './details/details.component';
import { RequisitionDetailsComponent } from './details/requisition-details/requisition-details.component';

@NgModule({
  declarations: [RequisitionComponent, EmployeeRequisitionsComponent, DepartmentRequisitionsComponent, DetailsComponent, RequisitionDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    RequisitionRoutingModule,
  ],
  providers: [RequisitionService],
})
export class RequisitionModule { }
