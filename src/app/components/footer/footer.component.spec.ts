import { IProductDetails } from './../../common/interface/product.interface';
import { ProductMockUpData } from './../../common/mockup-data/product.mockup.data';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let mockData: IProductDetails;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    mockData = ProductMockUpData.ProductResponse;
    component.pagingData = mockData.data.paging;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnChanges for updating total page data', () => {
    component.ngOnChanges();
    expect(component.totalPage).toEqual(mockData.data.paging.total_page);
  });

  it('should check makeFooterPage for pages less than 5', () => {
    component.pagingData.page = 2;
    component.makeFooterPage();
    expect(component.footerPageArray).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('should check makeFooterPage for random page', () => {
    component.pagingData.page = 7;
    component.makeFooterPage();
    expect(component.footerPageArray).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });

  it('should check makeFooterPage for pages greater than total page', () => {
    component.pagingData.page = 18;
    component.makeFooterPage();
    expect(component.footerPageArray).toEqual([
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ]);
  });

  it('should check navigatePage for updatingpage number', () => {
    spyOn(component, 'makeFooterPage');
    component.currentPage = 1;
    component.totalPage = 20;
    component.navigatePage(10);
    expect(component.pagingData.page).toEqual(10);
    expect(component.makeFooterPage).toHaveBeenCalled();
  });
});
