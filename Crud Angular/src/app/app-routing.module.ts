import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { ShowAllProductComponent } from './components/show-all-product/show-all-product.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';


const routes: Routes = [
  { path: '', component: ShowAllProductComponent },
  { path: 'add_new_product', component: AddNewProductComponent },
  { path: 'view/:id', component: SingleProductComponent },
  { path: 'edit/:id', component: EditProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
