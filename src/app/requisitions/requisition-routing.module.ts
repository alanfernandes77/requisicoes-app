import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentRequisitionsComponent } from './department-requisitions/department-requisitions.component';
import { DetailsComponent } from './details/details.component';
import { EmployeeRequisitionsComponent } from './employee-requisitions/employee-requisitions.component';
import { RequisitionComponent } from './requisition.component';
import { RequisitionResolver } from './services/requisition.resolver';

const routes: Routes = [
  {
    path: '',
    component: RequisitionComponent,
    children: [
      {
        path: '', redirectTo: 'my-requisitions', pathMatch: 'full'
      },
      {
        path: 'my-requisitions',
        component: EmployeeRequisitionsComponent
      },
      {
        path: 'my-department-requisitions',
        component: DepartmentRequisitionsComponent
      }
    ]
  },
  {
    path: ':id',
    component: DetailsComponent,
    resolve: { requisition: RequisitionResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequisitionRoutingModule { }
