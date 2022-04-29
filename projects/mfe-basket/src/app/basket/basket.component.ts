import { Component, OnInit } from '@angular/core';
import { BasketService, Product } from '@shared';

interface BasketProduct {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styles: [
  ]
})
export class BasketComponent implements OnInit {

  public items: BasketProduct[] = [];
  public totalItems = 0;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    const basketItems = this.basketService.getBasketItems();
    this.items = basketItems
        .reduce((acc, cur) => {
          const idx = acc.findIndex(p => p.product.id === cur.id);
          idx !== -1 ? acc[idx].quantity++ : acc.push({product: cur, quantity: 1});
          return acc;
        }, [] as BasketProduct[]);

    this.totalItems = basketItems.length;
  }
}
