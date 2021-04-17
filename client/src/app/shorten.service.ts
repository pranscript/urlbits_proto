import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url, urlResponse } from './model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShortenService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  public saveURL (url:any){
    console.log("getAllDAta callled");
    return this.http.post<urlResponse>( 'service/save',url,{headers: this.headers}).pipe(map(res => res ));
  }


}
