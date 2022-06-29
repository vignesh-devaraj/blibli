import { Subscription } from 'rxjs';
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
export class AppComponent implements OnInit {
  @ViewChild('modalBtn') modalButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('productList', { static: false })
  public productClass!: ElementRef<HTMLElement>;
  public scrollSubscriber!: Subscription;
  public productDetails!: IProductDetails;
  public searchQuery!: ISearchQuery;
  public start = 0;
  public isLoading = false;
  public isInitialLoad = true;
  public cartProducts: IProducts[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    let timer: any;
    this.scrollSubscriber = this.productService.triggerScrollEventObs.subscribe(
      {
        next: () => {
          this.loadMoreProducts();
        },
      }
    );
  }

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
    if(this.productDetails) {
      this.productDetails.data.products = [];
      this.productDetails.status="Loading";
    }
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

  loadMoreProducts(): void {
    let scrollHeight = +this.productClass.nativeElement.scrollHeight - 2;
    let scrolledHeight =
      this.productClass.nativeElement.scrollTop +
      this.productClass.nativeElement.clientHeight;
    if (scrolledHeight >= scrollHeight * 0.7) {
      if (++this.start <= 24) {
        this.isLoading = true;
        this.searchQuery.start = this.start;
        this.productService.searchProducts(this.searchQuery).subscribe({
          next: (response: IProductDetails) => {
            this.isLoading = false;
            this.productDetails.data.products = [
              ...this.productDetails.data.products,
              ...response.data.products,
            ];
          },
          error: (err) => {
            this.isLoading = false;
            this.productDetails = err;
          },
        });
      }
    }
  }
}
