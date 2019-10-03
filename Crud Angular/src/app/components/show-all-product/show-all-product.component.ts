import { Component, OnInit } from '@angular/core';
import { ProductApiService } from 'src/app/services/product-api.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-all-product',
  templateUrl: './show-all-product.component.html',
  styleUrls: ['./show-all-product.component.scss']
})
export class ShowAllProductComponent implements OnInit {

  products: Product[];

  constructor(private prdServ: ProductApiService, private router: Router) { }


  ngOnInit() {
    this.prdServ.getAllProducts().subscribe(data => this.products = data);
  }

  viewProduct(id) {
    this.router.navigate(['view/' +  id]);
    console.log(id);
  }

  editProduct(id) {
    this.router.navigate(['edit/' +  id]);
    console.log(id);
  }

  deleteProduct(id) {
    this.prdServ.deleteOneProduct(id).subscribe((data) => {
      this.ngOnInit();
      console.log('Delete Successfully ..... ');
    },
     (err) => {
      console.log('Error In Delete ..... ');
    });
  }

  addProduct() {
    this.router.navigate(['add_new_product']);
  }
}
