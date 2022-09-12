import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Requisition } from '../models/requisition.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {

  public requisition: Requisition;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.requisition = this.route.snapshot.data['requisition'];
  }
}
