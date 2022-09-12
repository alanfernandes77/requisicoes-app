import { Component, Input, OnInit } from '@angular/core';
import { Requisition } from '../../models/requisition.model';

@Component({
  selector: 'app-requisition-details',
  templateUrl: './requisition-details.component.html'
})
export class RequisitionDetailsComponent {
  @Input()
  requisition: Requisition;
}
