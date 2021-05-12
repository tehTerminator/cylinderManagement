import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  collapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.collapsed = !this.collapsed;
  }

}
