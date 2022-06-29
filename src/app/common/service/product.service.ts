import {
  ISearchQuery,
  IProductDetails,
  IProducts,
} from './../interface/product.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const API = 'https://www.blibli.com/backend/search/products?';
const ITEM_PER_PAGE = 24;

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  public cartProducts: IProducts[] = [];
  private selectedProducts = new Subject<number>();
  public selectedProductObs = this.selectedProducts.asObservable();
  private triggerScrollEvent = new Subject<boolean>();
  public triggerScrollEventObs = this.triggerScrollEvent.asObservable();

  constructor(private http: HttpClient) {}

  searchProducts(searchQuery: ISearchQuery): Observable<IProductDetails> {
    return this.http.get<IProductDetails>(
      `${API}searchTerm=${searchQuery.searchTerm}&start=${searchQuery.start}&itemPerPage=${ITEM_PER_PAGE}`
    );
  }

  addProductToCart(product: IProducts): void {
    this.cartProducts.push(product);
    this.selectedProducts.next(this.cartProducts.length);
  }

  removeProductFromCart(index: number): void {
    this.cartProducts.splice(index, 1);
    this.selectedProducts.next(this.cartProducts.length);
  }

  triggerScroll(): void {
    this.triggerScrollEvent.next(true);
  }
}
