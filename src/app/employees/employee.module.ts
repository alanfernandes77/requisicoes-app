import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from './services/employee.service';
import { EmployeeComponent } from './employee.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    NgSelectModule,
  ],
  providers: [EmployeeService],
})
export class EmployeeModule {}
