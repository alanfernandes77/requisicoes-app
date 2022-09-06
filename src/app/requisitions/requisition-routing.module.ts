import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequisitionComponent } from './requisition.component';

const routes: Routes = [
  { path: '', component: RequisitionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequisitionRoutingModule {}
