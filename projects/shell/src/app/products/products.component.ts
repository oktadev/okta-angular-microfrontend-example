import { Component, OnInit } from '@angular/core';
import { BasketService, Product, ProductsService } from '@shared';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];

  constructor(private productsService: ProductsService, private basketService: BasketService) { }

  public ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  public addToBasket(productId: number): void {
    const product = this.products.find(p => p.id === productId) as Product;
    this.basketService.addToBasket(product);
  }
}
