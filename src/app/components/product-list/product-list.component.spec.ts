import { ProductService } from './../../common/service/product.service';
import { ProductMockUpData } from './../../common/mockup-data/product.mockup.data';
import { IProductDetails, IProducts } from './../../common/interface/product.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockData: IProductDetails = JSON.parse(JSON.stringify(ProductMockUpData.ProductResponse));;
  const productServiceStub = {
    addProductToCart(product: IProducts) {
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers: [
        {provide: ProductService, useValue: productServiceStub}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check addToCart function', () => {
    spyOn(productServiceStub,"addProductToCart");
    component.addToCart(mockData.data.products[0]);
    expect(productServiceStub.addProductToCart).toHaveBeenCalled();
  });
});
