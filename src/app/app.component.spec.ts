import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductService } from './common/service/product.service';
import { of } from 'rxjs';
import {
  IProductDetails,
  ISearchQuery,
} from './common/interface/product.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProductMockUpData } from './common/mockup-data/product.mockup.data';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockData: IProductDetails = ProductMockUpData.ProductResponse;

  const productServiceStub = {
    selectedProductObs: of(1),
    cartProducts: [mockData.data.products[0]],
    searchProducts(searchQuery: ISearchQuery) {
      return of(mockData);
    },
    removeProductFromCart(index: number) {},
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        ProductListComponent,
        FooterComponent,
      ],
      providers: [
        { provide: ProductService, useValue: productServiceStub },
        TranslateService,
      ],
    }).compileComponents();
    mockData = ProductMockUpData.ProductResponse;
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.productDetails = mockData;
    component.searchQuery = { searchTerm: 'apple', start: 5 };
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should check searchProducts function', () => {
    spyOn(component, 'getProductDetails');
    component.searchProducts({ searchInput: 'apple' });
    expect(component.isInitialLoad).toBe(false);
    expect(component.getProductDetails).toHaveBeenCalled();
  });

  it('should check getProductDetails function', () => {
    component.getProductDetails();
    expect(component.productDetails).toEqual(mockData);
  });

  it('should check navigateToPagenavigateToPage function', () => {
    spyOn(component, 'getProductDetails');
    component.navigateToPage(15);
    expect(component.getProductDetails).toHaveBeenCalled();
  });

  it('should check openModal function', () => {
    component.openModal();
    expect(component.cartProducts).toEqual([mockData.data.products[0]]);
  });

  it('should check deleteProduct function', () => {
    spyOn(productServiceStub, 'removeProductFromCart');
    component.deleteProduct(1);
    expect(productServiceStub.removeProductFromCart).toHaveBeenCalled();
  });
});
