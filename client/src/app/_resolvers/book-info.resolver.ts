import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LibBookInfo } from '../_models/libBook';
import { Member } from '../_models/member';
import { InfoService } from '../_services/info.service';
import { MembersService } from '../_services/members.service';

@Injectable({
    providedIn: 'root'
})
export class BookInfoResolver implements Resolve<LibBookInfo> {

    constructor(private infoService:InfoService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<LibBookInfo> {
        let id = Number(route.paramMap.get('idIsbn')) || 0;
        return this.infoService.getBookInfo(id);
    }

}