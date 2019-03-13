import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Proudouct } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  selectedItem;
  constructor(private httpclient: HttpClient) { }

  getDataChunk(index){
    return this.httpclient.post("http://localhost:4040/product/getDataChunk",{index:index});
  }


  getProducts (index): Observable<Proudouct[]> {
    return this.httpclient.get<Proudouct[]>("http://localhost:4040/product/getDataChunk1/"+index)
      .pipe(
        tap(todos => {console.log(todos)}),
        catchError(this.handleError('getProducts', []))
      );
  }
  
  getItemsSortByProduct (index): Observable<Proudouct[]> {
    return this.httpclient.get<Proudouct[]>("http://localhost:4040/product/getDataChunkSortedByProduct/"+index)
      .pipe(
        tap(todos => {console.log(todos)}),
        catchError(this.handleError('getItemsSortByProduct', []))
      );
  }
  getItemsSearch(value){
    return this.httpclient.get<Proudouct[]>("http://localhost:4040/product/getDataChunkForSearch/"+value)
    .pipe(
      tap(todos => {console.log(todos)}),
      catchError(this.handleError('getItemsSearch', []))
    );
  }

  setOptions(value){
    console.log(value)
    return this.httpclient.post("http://localhost:4040/product/getOptions/",{value});
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
