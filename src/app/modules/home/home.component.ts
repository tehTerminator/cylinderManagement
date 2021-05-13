import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  statsToDisplay = [
    {
      title: 'Total Patients Admitted Today',
      url : ['patients', 'admittedToday']
    },
    {
      title: 'Total Patients Discharged Today',
      url: ['patients', 'dischargedToday']
    },
    {
      title: 'Total Cylinders Disbursed',
      url: ['oxygen_request', 'approvedToday']
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
