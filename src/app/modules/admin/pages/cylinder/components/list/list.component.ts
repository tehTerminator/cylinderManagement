import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cylinder } from '../../../../../../shared/collection';
import { CylinderService } from './../../../../../../shared/cylinder.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private store: CylinderService) { }

  ngOnInit(): void {
    this.store.init();
  }

  get cylinderTypes(): Observable<Cylinder[]> {
    return this.store.getAsObservable() as Observable<Cylinder[]>;
  }
}
