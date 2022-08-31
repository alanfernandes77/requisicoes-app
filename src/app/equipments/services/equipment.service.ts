import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private registers: AngularFirestoreCollection<Equipment>;

  constructor(
    private firestore: AngularFirestore
  ) {
    this.registers = this.firestore.collection<Equipment>('equipments');
  }

  async insert(equipment: Equipment): Promise<any> {
    if (!equipment) return Promise.reject('Item inválido');

    const result = await this.registers.add(equipment);

    equipment.id = result.id;

    this.registers.doc(result.id).set(equipment);
  }

  async update(equipment: Equipment): Promise<void> {
    return this.registers.doc(equipment.id).set(equipment);
  }

  async delete(equipment: Equipment): Promise<void> {
    return this.registers.doc(equipment.id).delete();
  }

  getAll(): Observable<Equipment[]> {
    return this.registers.valueChanges();
  }
}
