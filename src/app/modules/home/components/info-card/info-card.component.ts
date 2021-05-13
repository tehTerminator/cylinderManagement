import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { retry } from 'rxjs/operators';
import { ApiService } from './../../../../shared/api.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnChanges {
  @Input() title = 'Title';
  @Input() url = [''];
  stat = 0;

  constructor(private api: ApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const url = changes.url;
    const title = changes.title;
    if (url.currentValue !== url.previousValue) {
      this.url = url.currentValue as string[];
      this.fetchData();
    }

    if (title.currentValue !== title.previousValue) {
      this.title = title.currentValue as string;
    }
  }

  private fetchData(): void {
    this.api.select<{value: number}>(this.url)
    .pipe(retry(3))
    .subscribe(
      (data => this.stat = data.value),
    );
  }

}
