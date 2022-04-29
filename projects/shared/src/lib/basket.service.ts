import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private products: Product[] = [];

  constructor() { }

  public getBasketItems(): Product[] {
    return this.products;
  }

  public addToBasket(product: Product): Product[] {
    this.products.push(product);
    return this.products;
  }
}

