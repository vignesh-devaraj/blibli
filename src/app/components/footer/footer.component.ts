import { IPaging } from './../../common/interface/product.interface';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
})
export class FooterComponent implements OnChanges {
  @Input() pagingData!: IPaging | any;
  @Output() pageNoEmitter: EventEmitter<any> = new EventEmitter();
  footerPageArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  currentPage = 1;
  totalPage!: number;

  constructor() {}

  ngOnChanges(): void {
    this.totalPage = this.pagingData?.total_page;
  }

  makeFooterPage(): void {
    this.currentPage = this.pagingData?.page;
    this.totalPage = this.pagingData?.total_page;
    if (this.currentPage <= 5 && this.totalPage >= 10) {
      this.footerPageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    } else if (this.currentPage + 5 > this.totalPage) {
      this.generateArray(this.totalPage - 9);
    } else {
      this.generateArray(this.currentPage - 5);
    }
  }

  generateArray(endValue: number): void {
    this.footerPageArray = [];
    for (let i = 0, j = endValue; i < 10; i++) {
      this.footerPageArray[i] = j++;
    }
  }

  navigatePage(pageNo: number): void {
    if (
      pageNo >= 1 &&
      pageNo !== this.currentPage &&
      pageNo <= this.totalPage
    ) {
      this.pagingData.page = pageNo;
      this.pageNoEmitter.emit(pageNo);
      this.makeFooterPage();
    }
  }
}
