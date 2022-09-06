import { Department } from 'src/app/departments/models/department.model';
import { Equipment } from 'src/app/equipments/models/equipment.model';

export class Requisition {
  id: string;
  creationDate: Date = new Date();
  department?: Department;
  departmentId: string;
  description: string;
  equipment?: Equipment;
  equipmentId: string;
}
