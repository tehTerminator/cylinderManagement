import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OxygenRequest } from '../../../../shared/collection';
import { RequestService } from './../../../../shared/request.service';
import { SnackBarService } from './../../../../shared/snack-bar.service';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.scss']
})
export class ListRequestsComponent implements OnInit {
  requests: OxygenRequest[] = [];
  constructor(
    private reqService: RequestService,
    private snackBar: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reqService.fetchPending()
    .subscribe(
      (data => this.requests = data),
      (error => this.snackBar.show(error))
    );
  }

  onSelect(req: OxygenRequest): void {
    this.reqService.selectedReq = req;
    this.router.navigate(['/request', 'process']);
  }


}
