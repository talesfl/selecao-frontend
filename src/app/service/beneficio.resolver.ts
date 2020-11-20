import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

import { Beneficio } from '../dominio/beneficio';
import { BeneficioService } from '../service/beneficio.service';
import { Page } from '../dominio/page';

@Injectable()
export class BeneficioResolver implements Resolve<Page<Beneficio>> {

    constructor(private beneficioService: BeneficioService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Page<Beneficio> | Observable<Page<Beneficio>> | Promise<Page<Beneficio>> {

        return this.beneficioService.findByNomeStartingWith();
    }

}
