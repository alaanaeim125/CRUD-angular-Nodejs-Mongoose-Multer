import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductApiService } from '../../services/product-api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  selectedPrd: Product;
  ImageUrl: string;

  constructor(private activeRoute: ActivatedRoute, private prdServ: ProductApiService, private location: Location) {
                this.selectedPrd = new Product();
               }

  ngOnInit() {
    const productId = this.activeRoute.snapshot.params.id;
    this.prdServ.getOneProduct(productId).subscribe(data => {
      this.selectedPrd = data;
      this.ImageUrl = 'http://localhost:3030/' + this.selectedPrd.Image;
    });
  }

  BackBack() {
    this.location.back();
  }

}
