import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainListComponent } from './main-list/main-list.component';
import { ProductDisplayComponent } from './product-display/product-display.component';

const routes: Routes = [
  {path:"home",component:MainListComponent},
  {path:"display",component:ProductDisplayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
