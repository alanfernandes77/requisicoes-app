import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisitionRoutingModule } from './requisition-routing.module';
import { RequisitionComponent } from './requisition.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RequisitionService } from './services/requisition.service';

@NgModule({
  declarations: [RequisitionComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    RequisitionRoutingModule,
  ],
  providers: [RequisitionService],
})
export class RequisitionModule {}
