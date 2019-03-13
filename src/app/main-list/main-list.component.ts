import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { HttpClientService } from '../Services/http-client.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Proudouct } from '../Models/Product';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class MainListComponent extends DataSource<Proudouct> implements OnInit  {
  
  myControl = new FormControl();
  options: string[] = [''];
  filteredOptions: Observable<string[]>;


  ds=this;
  oldProdArr: Proudouct[];
  private currentProdArr:Proudouct[];
  private dataStream = new BehaviorSubject<Proudouct[]>([]);
  index=0;
  sortProduct=false;

  constructor(private router: Router,private httpClient:HttpClientService){
    super()
  } 
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    //console.log(filterValue)
    this.httpClient.setOptions(filterValue).subscribe((data:[])=>{
      data.forEach(element => {
        this.options.push(element['product'])
      });
          if(filterValue!=''){
            this.nextDataSearch(filterValue)
          }
    })
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  connect() {
    this.httpClient.getProducts(this.index)
    .subscribe((photos) => {
      this.currentProdArr = photos;
      this.dataStream.next(this.currentProdArr);
      this.index+=20;
    });

    return this.dataStream;
  }
  
  nextData(){
    this.index+=20;
    this.httpClient.getProducts(this.index)
    .subscribe((photos) => {
      this.oldProdArr=this.currentProdArr;
      this.currentProdArr = photos;
      this.dataStream.next(this.currentProdArr);
    });
  return this.dataStream;
  }

  nextDataSortByProduct(){
    this.index+=20;
    this.httpClient.getItemsSortByProduct(this.index)
    .subscribe((products) => {
      this.oldProdArr=this.currentProdArr;
      this.currentProdArr =products;
      this.dataStream.next(this.currentProdArr);
    });
  return this.dataStream;
  }

  nextDataOnTop(){
    this.index-=20;
    this.httpClient.getProducts(this.index)
    .subscribe((photos) => {
      this.oldProdArr=this.currentProdArr;
      this.currentProdArr = photos;
      this.dataStream.next(this.currentProdArr);
    });
  return this.dataStream;
  }
  
  nextDataSortByProductOnTop(){
    this.index-=20;
    this.httpClient.getItemsSortByProduct(this.index)
    .subscribe((photos) => {
      this.oldProdArr=this.currentProdArr;
      this.currentProdArr = photos;
      this.dataStream.next(this.currentProdArr);
    });
  return this.dataStream;
  }
  itemSelected(item){
    console.log(item)
    this.httpClient.selectedItem=item;
    this.router.navigate(["/display"]);

  }

  scrolled(event){
    const tableViewHeight = event.target.offsetHeight; // viewport: ~500px
    const tableScrollHeight = event.target.scrollHeight; // length of all table
    const scrollLocation = event.target.scrollTop; // how far user scrolled
    const buffer = 2;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      console.log("in the if")
      if(this.sortProduct){
        this.nextDataSortByProduct();
      }else{
        this.nextData();
      }
     
      setTimeout(()=>{this.scrollBottom();},20);
    }
    if (scrollLocation<1){
      console.log("is 1")
      if(this.sortProduct){
        this.nextDataSortByProductOnTop();
      }else{
        this.nextDataOnTop();
      }
      setTimeout(()=>{this.scrollBottom();},20);
    }
  }
  
  scrollBottom() {
    document.querySelector("cdk-virtual-scroll-viewport").scrollTop=300;
  }

  sortByID(){
    this.sortProduct=false;
    this.index=-20;
    this.nextData();
  }


  sortByProduct(){
    this.index=0;
    this.sortProduct=true;
    this.nextDataSortByProduct();
  }

  nextDataSearch(value){
    this.index=0;
    this.httpClient.getItemsSearch(value)
    .subscribe((produts) => {
      this.oldProdArr=this.currentProdArr;
      this.currentProdArr = produts;
      this.dataStream.next(this.currentProdArr);
    });

  return this.dataStream;

  }

  disconnect(): void {
  }
  
}
