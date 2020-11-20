import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessoResolver } from '../service/processo.resolver';
import { ProcessoComponent } from './processo.component';

const routes: Routes = [
  { path: '', component: ProcessoComponent, resolve: { page: ProcessoResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessoRoutingModule { }
