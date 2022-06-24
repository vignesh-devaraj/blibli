import { ProductMockUpData } from './../mockup-data/product.mockup.data';
import { IProductDetails } from './../interface/product.interface';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let mockData: IProductDetails = ProductMockUpData.ProductResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check addProductToCart function', () => {
    service.addProductToCart(mockData.data.products[0]);
    expect(service.cartProducts[0]).toEqual(mockData.data.products[0]);
  });

  it('should check removeProductFromCart function', () => {
    service.addProductToCart(mockData.data.products[0]);
    service.removeProductFromCart(0);
    expect(service.cartProducts.length).toEqual(0);
  });
});
