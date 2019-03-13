import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../Services/http-client.service';
import { Proudouct } from '../Models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
item:Proudouct;
  constructor(private router: Router,private httpService:HttpClientService) { }

  ngOnInit() {
    this.item=this.httpService.selectedItem;
  }
  getStockStatus(){
    if (this.item.inStock){
      return "In Stock";
    }else{
      return "Out Of Stock";
    }
  }

  back(){
    this.router.navigate(["/home"]);
  }

}
