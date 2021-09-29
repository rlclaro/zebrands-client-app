import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0,
    brand: ''
  };
  submitted = false;

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private router: Router)
     { }

  ngOnInit(): void {
  }

  saveProduct(): void {
    this.spinner.show();
    const data = {
      name: this.product.name,
      price: this.product.price,
      brand: this.product.brand
    };

    this.productService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.spinner.hide();
          this.submitted = true;
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
          this.spinner.hide();
        });
  }
  newProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      price: 0,
      brand: ''
    };
  }
}
