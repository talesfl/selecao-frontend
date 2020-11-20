import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServidorResolver } from '../service/servidor.resolver';

import { ServidorComponent } from './servidor.component';

const routes: Routes = [{ path: '', component: ServidorComponent, resolve: { page: ServidorResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServidorRoutingModule { }
