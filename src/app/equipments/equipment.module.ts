import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentComponent } from './equipment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { EquipmentService } from './services/equipment.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [EquipmentComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    EquipmentRoutingModule,
    NgxMaskModule.forChild(),
    SharedModule,
    CurrencyMaskModule,
  ],
  providers: [EquipmentService],
})
export class EquipmentModule {}
