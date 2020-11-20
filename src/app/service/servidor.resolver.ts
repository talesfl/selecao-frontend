import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

import { Servidor } from '../dominio/servidor';
import { ServidorService } from '../service/servidor.service';
import { Page } from '../dominio/page';

@Injectable()
export class ServidorResolver implements Resolve<Page<Servidor>> {

    constructor(private servidorService: ServidorService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Page<Servidor> | Observable<Page<Servidor>> | Promise<Page<Servidor>> {

        return this.servidorService.findByNomeStartingWith();
    }

}
