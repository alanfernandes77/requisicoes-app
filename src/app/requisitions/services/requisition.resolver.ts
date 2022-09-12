import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Requisition } from '../models/requisition.model';
import { RequisitionService } from './requisition.service';

@Injectable({
  providedIn: 'root'
})
export class RequisitionResolver implements Resolve<Requisition> {

  constructor(private requisitionService: RequisitionService) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Requisition> {
    return this.requisitionService.getById(route.params['id']);
  }
}
