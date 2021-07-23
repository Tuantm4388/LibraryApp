import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LibBookInfo } from '../_models/libBook';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  baseUrl = environment.apiUrl;
  emptyInfo: LibBookInfo;
  constructor(private http: HttpClient) { }
  private currentInfoSource = new ReplaySubject<LibBookInfo>(1);
  selectedInfo$ = this.currentInfoSource.asObservable();

  setSelectedISBN(_info: LibBookInfo) {
    localStorage.setItem('info', JSON.stringify(_info));
    this.currentInfoSource.next(_info);
  }

  getIsbnList() {
    return this.http.get<Partial<LibBookInfo[]>>(this.baseUrl + 'info');
  }

  getBookInfo(idIsbn: number) {
    return this.http.get<LibBookInfo>(this.baseUrl + 'info/' + idIsbn);
  }

  addNewISBN(isbn: string,
    title: string,
    author: string,
    origin: string,
    language: string,
    catalogue: string,
    summary: string,
    adddate: Date,
    publishdate: Date,
    photourl: string) {
    //return this.http.post(this.baseUrl + 'info/add-card?idbook='+idBook+'&iduser='+idUser+'&borrowtime='+borrowTime.toJSON()+'&returntime='+returnTime.toJSON()+'&states=' + this.reservedState,1);
    return this.http.post(this.baseUrl + 'info/add-info?isbn=' + isbn
      + '&title=' + title
      + '&author=' + author
      + '&origin=' + origin
      + '&language=' + language
      + '&catalogue=' + catalogue
      + '&summary=' + summary
      + '&adddate=' + adddate.toJSON()
      + '&publishdate=' + publishdate.toJSON()
      + '&photourl=' + photourl, 1);
  }

  updateISBN(id:number,
    isbn: string,
    title: string,
    author: string,
    origin: string,
    language: string,
    catalogue: string,
    summary: string,
    adddate: Date,
    publishdate: Date,
    photourl: string) {
    //return this.http.post(this.baseUrl + 'info/add-card?idbook='+idBook+'&iduser='+idUser+'&borrowtime='+borrowTime.toJSON()+'&returntime='+returnTime.toJSON()+'&states=' + this.reservedState,1);
    return this.http.post(this.baseUrl + 'info/update-info?id=' + id
      + '&isbn=' + isbn
      + '&title=' + title
      + '&author=' + author
      + '&origin=' + origin
      + '&language=' + language
      + '&catalogue=' + catalogue
      + '&summary=' + summary
      + '&adddate=' + adddate.toJSON()
      + '&publishdate=' + publishdate.toJSON()
      + '&photourl=' + photourl, id);
  }

}
