import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

import { Orgao } from '../dominio/orgao';
import { OrgaoService } from '../service/orgao.service';
import { Page } from '../dominio/page';

@Injectable()
export class OrgaoResolver implements Resolve<Page<Orgao>> {

    constructor(private orgaoService: OrgaoService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Page<Orgao> | Observable<Page<Orgao>> | Promise<Page<Orgao>> {

        return this.orgaoService.findByNomeStartingWith();
    }

}
