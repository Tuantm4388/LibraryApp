import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  baseUrl = environment.apiUrl;

  reservedState:string="reserved";

  constructor(private http: HttpClient) { }
  
  addBorrowcard(idBook:number,idUser: number,borrowTime:Date,returnTime:Date) {
    return this.http.post(this.baseUrl + 'borrow/add-card?idbook='+idBook+'&iduser='+idUser+'&borrowtime='+borrowTime.toJSON()+'&returntime='+returnTime.toJSON()+'&states=' + this.reservedState,1);
  }
}
