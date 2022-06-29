import { ProductMockUpData } from './../../common/mockup-data/product.mockup.data';
import { ProductService } from './../../common/service/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  IProductDetails,
  ISearchQuery,
} from './../../common/interface/product.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { of} from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockData: IProductDetails = JSON.parse(JSON.stringify(ProductMockUpData.ProductResponse));;

  const productServiceStub = {
    selectedProductObs: of(1),
    searchProducts(searchQuery: ISearchQuery) {
      return of(mockData);
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [NavbarComponent],
      providers: [{ provide: ProductService, useValue: productServiceStub }],
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check searchData function', () => {
    spyOn(component.searchInputEmitter, 'emit');
    component.searchForm.get('searchInput')?.setValue('apple');
    component.searchData();
    expect(component.searchInputEmitter.emit).toHaveBeenCalled();
  });

  it('should check resetForm function', () => {
    component.searchForm.get('searchInput')?.setValue('apple');
    component.resetForm();
    expect(component.searchForm.get('searchInput')?.value).toBeFalsy();
  });

  it('should check openModal function', () => {
    spyOn(component.modalEmitter, 'emit');
    component.openModal();
    expect(component.modalEmitter.emit).toHaveBeenCalled();
  });
});
