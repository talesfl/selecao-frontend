import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaDocumentoComponent } from './categoria-documento.component';

const routes: Routes = [{ path: '', component: CategoriaDocumentoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaDocumentoRoutingModule { }
