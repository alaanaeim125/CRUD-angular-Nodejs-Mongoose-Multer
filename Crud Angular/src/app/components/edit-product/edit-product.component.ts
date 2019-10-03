import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductApiService } from 'src/app/services/product-api.service';
import { Product } from 'src/app/models/product';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3030/api/upload';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'Image' });

  brands = ['Laptop Apple', 'Laptop Dell', 'Laptop HP', 'Laptop Accer', 'Laptop Samsung'];
  productId: string;
  imageURL: string;
  selectedProduct: Product;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private prdServ: ProductApiService) {
    this.selectedProduct = new Product();
  }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params.id;
    this.prdServ.getOneProduct(this.productId).subscribe(data => {
      this.selectedProduct = data;
      this.imageURL = 'http://localhost:3030/' + this.selectedProduct.Image;
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    };
  }

  UpdateProduct(product) {
    console.log(product.value);
    this.prdServ.updateProduct(this.productId, product.value).subscribe((data) => {
        console.log('Update Successfully ..... ');
        setTimeout( () => {
          this.router.navigate(['/']);
        }, 3000);
    }, (err) => {
      console.log('Error In Update ..... ');
    });

  }
}
