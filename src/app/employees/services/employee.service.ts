import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Department } from 'src/app/departments/models/department.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private registers: AngularFirestoreCollection<Employee>;

  constructor(private firestore: AngularFirestore) {
    this.registers = this.firestore.collection<Employee>('employees');
  }

  async insert(employee: Employee): Promise<any> {
    if (!employee) return Promise.reject('Item inválido');

    const result = await this.registers.add(employee);

    employee.id = result.id;

    this.registers.doc(result.id).set(employee);
  }

  async update(employee: Employee): Promise<void> {
    return this.registers.doc(employee.id).set(employee);
  }

  async delete(employee: Employee): Promise<void> {
    return this.registers.doc(employee.id).delete();
  }

  getAll(): Observable<Employee[]> {
    return this.registers.valueChanges().pipe(
      map((employees: Employee[]) => {
        employees.forEach((employee) => {
          this.firestore
            .collection<Department>('departments')
            .doc(employee.departmentId)
            .valueChanges()
            .subscribe((department) => (employee.department = department));
        });

        return employees;
      })
    );
  }
}
