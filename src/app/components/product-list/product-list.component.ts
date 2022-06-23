import { IProductDetails } from './../../common/interface/product.interface';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
})
export class ProductListComponent implements OnInit {
  @Input() productDetails!: IProductDetails;
  constructor() {}

  image =
    'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/MTA-2565451/apple_apple-iphone-7-32gb-smartphone_full21.jpg';
  badge = "https://www.static-src.com//siva/asset///07_2020/icon-top-rated-diamond.png";
  ngOnInit(): void {
    console.log(this.productDetails);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.productDetails);
  }
}
