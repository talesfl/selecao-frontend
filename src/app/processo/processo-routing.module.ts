import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessoComponent } from './processo.component';

const routes: Routes = [
  { path: '', component: ProcessoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessoRoutingModule { }
