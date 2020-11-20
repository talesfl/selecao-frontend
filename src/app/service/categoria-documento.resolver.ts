import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

import { CategoriaDocumento } from '../dominio/categoria-documento';
import { CategoriaDocumentoService } from '../service/categoria-documento.service';
import { Page } from '../dominio/page';

@Injectable()
export class CategoriaDocumentoResolver implements Resolve<Page<CategoriaDocumento>> {

    constructor(private categoriaDocumentoService: CategoriaDocumentoService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Page<CategoriaDocumento> | Observable<Page<CategoriaDocumento>> | Promise<Page<CategoriaDocumento>> {

        return this.categoriaDocumentoService.findByNomeStartingWith();
    }

}
