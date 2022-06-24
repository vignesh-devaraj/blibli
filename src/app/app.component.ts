import { ProductMockUpData } from './common/mockup-data/product.mockup.data';
import { ProductService } from './common/service/product.service';
import {
  IProductDetails,
  ISearchQuery,
  IProducts,
} from './common/interface/product.interface';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {

  @ViewChild('modalBtn') modalButton!: ElementRef<HTMLButtonElement>;
  public productDetails!: IProductDetails;
  public searchQuery!: ISearchQuery;
  public start = 0;
  public isLoading = false;
  public isInitialLoad = true;
  public cartProducts: IProducts[] = [];

  constructor(private productService: ProductService) {}

  searchProducts(searchForm: any): void {
    this.isInitialLoad = false;
    if (searchForm.searchInput) {
      this.searchQuery = {
        searchTerm: searchForm.searchInput,
        start: this.start,
      };
      this.getProductDetails();
    }
  }

  getProductDetails(): void {
    this.isLoading = true;
    this.productService.searchProducts(this.searchQuery).subscribe({
      next: (response: IProductDetails) => {
        this.isLoading = false;
        this.productDetails = response;
        if (this.productDetails.data?.paging) {
          this.productDetails.data.paging.page = this.searchQuery.start + 1;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.productDetails = err;
      },
    });
    // this.productDetails = ProductMockUpData.ProductResponse;
  }

  navigateToPage(pageNo: any): void {
    this.searchQuery.start = pageNo - 1;
    this.getProductDetails();
  }

  openModal(): void {
    this.modalButton.nativeElement.click();
    this.cartProducts = this.productService.cartProducts;
  }

  deleteProduct(index: number): void {
    this.productService.removeProductFromCart(index);
  }
}
