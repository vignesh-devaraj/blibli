import { Subscription } from 'rxjs';
import { ProductService } from './../../common/service/product.service';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Output() searchInputEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() modalEmitter: EventEmitter<any> = new EventEmitter<any>();
  public searchForm = this.formBuilder.group({
    searchInput: '',
  });
  public shopCartCount = 0;
  public selectedProductObs!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.selectedProductObs = this.productService.selectedProductObs.subscribe(
      (count) => (this.shopCartCount = count)
    );
  }

  searchData(): void {
    if (this.searchForm.value.searchInput !== '') {
      this.searchInputEmitter.emit(this.searchForm.value);
    }
  }

  resetForm(): void {
    this.searchForm.reset();
  }

  openModal(): void {
    this.modalEmitter.emit();
  }

  ngOnDestroy(): void {
    this.selectedProductObs.unsubscribe();
  }
}
