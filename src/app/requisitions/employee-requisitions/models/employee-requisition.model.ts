import { Department } from 'src/app/departments/models/department.model';
import { Employee } from 'src/app/employees/models/employee.model';
import { Equipment } from 'src/app/equipments/models/equipment.model';

export class Requisition {
  id: string;
  description: string;
  creationDate: Date | any;

  employeeId: string;
  employee?: Employee;

  departmentId: string;
  department?: Department;
  
  equipmentId?: string;
  equipment?: Equipment;
}
