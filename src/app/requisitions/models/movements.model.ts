import { Employee } from "src/app/employees/models/employee.model";

export class Movement {
  status: string;
  date: Date | any;
  description: string;
  employee: Employee;
}
