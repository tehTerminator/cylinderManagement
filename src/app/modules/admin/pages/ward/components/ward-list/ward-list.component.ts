import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ward } from '../../../../../../shared/collection';
import { WardStoreService } from '../../../../../../shared/ward-store.service';

@Component({
  selector: 'app-ward-list',
  templateUrl: './ward-list.component.html',
  styleUrls: ['./ward-list.component.scss']
})
export class WardListComponent implements OnInit {

  constructor(private store: WardStoreService) { }

  ngOnInit(): void {
    this.store.init();
  }

  get wards(): Observable<Ward[]> {
    return this.store.getAsObservable() as Observable<Ward[]>;
  }
}
