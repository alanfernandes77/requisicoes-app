import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Department } from 'src/app/departments/models/department.model';
import { Equipment } from 'src/app/equipments/models/equipment.model';
import { Requisition } from '../models/requisition.model';

@Injectable({
  providedIn: 'root',
})
export class RequisitionService {
  private registers: AngularFirestoreCollection<Requisition>;

  constructor(private firestore: AngularFirestore) {
    this.registers = this.firestore.collection<Requisition>('requisitions');
  }

  async insert(requisition: Requisition): Promise<any> {
    if (!requisition) return Promise.reject('Item inválido');

    const result = await this.registers.add(requisition);

    requisition.id = result.id;

    this.registers.doc(result.id).set(requisition);
  }

  async update(requisition: Requisition): Promise<void> {
    return this.registers.doc(requisition.id).update(requisition);
  }

  async delete(requisition: Requisition): Promise<void> {
    return this.registers.doc(requisition.id).delete();
  }

  getAll(): Observable<Requisition[]> {
    return this.registers.valueChanges().pipe(
      map((requisitions: Requisition[]) => {
        requisitions.forEach((requisition) => {
          this.firestore
            .collection<Department>('departments')
            .doc(requisition.departmentId)
            .valueChanges()
            .subscribe((department) => (requisition.department = department));

          this.firestore
            .collection<Equipment>('equipments')
            .doc(requisition.equipmentId)
            .valueChanges()
            .subscribe((Equipment) => (requisition.equipment = Equipment));
        });

        return requisitions;
      })
    );
  }
}
