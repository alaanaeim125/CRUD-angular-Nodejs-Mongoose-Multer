import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../../services/product-api.service';
import { Product } from 'src/app/models/product';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';

const URL = 'http://localhost:3030/api/upload';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {


  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'Image' });

  brands = ['Laptop Apple', 'Laptop Dell', 'Laptop HP', 'Laptop Accer', 'Laptop Samsung'];

  constructor(private prdServ: ProductApiService, private router: Router) { }

  product: Product;

  addNewProduct(form) {
    this.prdServ.addNewProductt(form.value).subscribe((data) => {
      console.log(' Success ..... ');
      setTimeout( () => {
        this.router.navigate(['/']);
      }, 3000);
    }, (err) => {
      console.log(' Error ..... ');
    });
  }




  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    };
  }

}
