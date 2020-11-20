import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Page } from '../dominio/page';
import { Processo } from '../dominio/processo';
import { ProcessoService } from './processo.service';

@Injectable()
export class ProcessoResolver implements Resolve<Page<Processo>> {

    constructor(
        private processoService: ProcessoService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Page<Processo> | Observable<Page<Processo>> | Promise<Page<Processo>> {
        return this.processoService.findByNomeStartingWith();
    }

}
