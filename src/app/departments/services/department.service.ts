import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  private registers: AngularFirestoreCollection<Department>;

  constructor(private firestore: AngularFirestore) {
    this.registers = this.firestore.collection<Department>("departments");
  }

  async insert(department: Department): Promise<any> {
    if (!department)
      return Promise.reject('Item inválido');

    const result = await this.registers.add(department);

    department.id = result.id;

    this.registers.doc(result.id).set(department);
  }

  async update(department: Department): Promise<void> {
    return this.registers.doc(department.id).set(department);
  }

  async delete(department: Department): Promise<void> {
    return this.registers.doc(department.id).delete();
  }

  getAll(): Observable<Department[]> {
    return this.registers.valueChanges();
  }
}
