import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaDocumentoResolver } from '../service/categoria-documento.resolver';

import { CategoriaDocumentoComponent } from './categoria-documento.component';

const routes: Routes = [{ path: '', component: CategoriaDocumentoComponent, resolve: { page: CategoriaDocumentoResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaDocumentoRoutingModule { }
