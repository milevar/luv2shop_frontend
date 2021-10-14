import { Component, OnInit } from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( () => {
      this.handleProductDetails();
    });
  }

  private handleProductDetails() {
      const theProductId: number = +this.route.snapshot.paramMap.get('id');
      this.productService.getProduct(theProductId).subscribe(
        data => {
          this.product = data;
        }
      );
  }

  addToCart() {
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);

    // TODO ... do the real work
    const theCartItem = new CartItem(this.product);

    this.cartService.addToCart(theCartItem);
  }
}
