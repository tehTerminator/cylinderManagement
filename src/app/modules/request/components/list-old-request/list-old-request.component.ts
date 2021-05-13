import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OxygenRequest } from '../../../../shared/collection';

@Component({
  selector: 'app-list-old-request',
  templateUrl: './list-old-request.component.html',
  styleUrls: ['./list-old-request.component.scss']
})
export class ListOldRequestComponent implements OnChanges {
  @Input() requests: OxygenRequest[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes.requests;

    if (change.currentValue !== change.previousValue) {
      this.requests = change.currentValue as OxygenRequest[];
    }
  }

  getTextColor(req: OxygenRequest): string {
    switch (req.state) {
      case 'ACTIVE':
        return 'text-primary';
      case 'ACCEPTED':
        return 'text-success';
      default:
        return 'text-danger';
    }
  }
}
