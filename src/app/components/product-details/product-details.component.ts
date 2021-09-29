import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  currentProduct: Product = {
    name: '',
    price: 0,
    brand: "",
    created: ""
  };
  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.message = '';
    this.getProduct(this.route.snapshot.params.id);
  }

  getProduct(sku: string): void {
    this.productService.get(sku)
      .subscribe(
        data => {
          this.currentProduct = data;
        },
        error => {
          console.log(error);
        });
  }

  updateProduct(): void {
    this.message = '';
    this.spinner.show();
    this.productService.update(this.currentProduct.sku, this.currentProduct)
      .subscribe(
        response => {
          this.spinner.hide();
          console.log(response);
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
          this.spinner.hide();
        });
  }

  deleteProduct(): void {
    this.spinner.show();
    this.productService.delete(this.currentProduct.sku)
      .subscribe(
        response => {
          console.log(response);
          this.spinner.hide();
          this.router.navigate(['/products']);
        },
        error => {
          this.spinner.hide();
          console.log(error);
        });
  }
}
