import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'panel', component: PanelComponent },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/department.module').then((m) => m.DepartmentModule),
  },

  {
    path: 'equipments',
    loadChildren: () =>
      import('./equipments/equipment.module').then((m) => m.EquipmentModule),
  },

  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employee.module').then((m) => m.EmployeeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
