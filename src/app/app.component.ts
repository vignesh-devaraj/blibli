import { I, IProductDetails } from './common/interface/product.interface';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  productDetails!: IProductDetails;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<IProductDetails>(
        'https://www.blibli.com/backend/search/products?searchTerm=samsung&start=0&itemPerPage=24'
      ).subscribe(
        (result: IProductDetails) => {
          this.productDetails = result;
        }
      );
    // this.http
    // .get<any>(
    //   '/backend/search/products?searchTerm=samsung&start=0&itemPerPage=24'
    // )
    // .subscribe(d => console.log(d)
    // );
    // this.http
    //   .get(
    //     '/aliens'
    //   )
    //   .subscribe(d => console.log(d)
    //   );
  }
}
