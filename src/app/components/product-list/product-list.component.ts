import { ProductService } from './../../common/service/product.service';
import {
  IProductDetails,
  IProducts,
} from './../../common/interface/product.interface';
import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
})
export class ProductListComponent {
  @Input() productDetails!: IProductDetails;

  constructor(private productService: ProductService) {}

  addToCart(product: IProducts): void {
    this.productService.addProductToCart(product);
    alert(`Product ${product.name} successfully added to cart`);
  }
}
