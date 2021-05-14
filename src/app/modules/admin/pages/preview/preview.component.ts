import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  username = '';
  password = '';
  displayName = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.getQueryParam('username');
    this.password = this.getQueryParam('password');
    this.displayName = this.getQueryParam('title');
  }

  private getQueryParam(key: string): string {
    const value = this.route.snapshot.queryParamMap.get(key);
    if (!!value) {
      return value;
    }
    return '';
  }

}
