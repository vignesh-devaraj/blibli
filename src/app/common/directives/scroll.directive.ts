import { ProductService } from '../service/product.service';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  public timer: any;
  constructor(private productService: ProductService) { }

  @HostListener("scroll") printScroll() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() =>  this.productService.triggerScroll(),400);
  }
}
