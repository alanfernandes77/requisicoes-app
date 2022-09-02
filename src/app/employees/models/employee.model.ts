import { Department } from "src/app/departments/models/department.model";

export class Employee {
  id: string;
  name: string;
  function: string;
  email: string;
  departmentId: string;
  department?: Department
}
