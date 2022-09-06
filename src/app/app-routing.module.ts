import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/services/auth.guard';
import { LoginGuard } from './auth/services/login.guard';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'panel', component: PanelComponent, canActivate: [AuthGuard] },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/department.module').then((m) => m.DepartmentModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'equipments',
    loadChildren: () =>
      import('./equipments/equipment.module').then((m) => m.EquipmentModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employee.module').then((m) => m.EmployeeModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'requisitions',
    loadChildren: () =>
      import('./requisitions/requisition.module').then(
        (m) => m.RequisitionModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
