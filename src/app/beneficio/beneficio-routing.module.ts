import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeneficioResolver } from '../service/beneficio.resolver';

import { BeneficioComponent } from './beneficio.component';

const routes: Routes = [{ path: '', component: BeneficioComponent, resolve: { page: BeneficioResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficioRoutingModule { }
