import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrgaoResolver } from '../service/orgao.resolver';
import { OrgaoComponent } from './orgao.component';


const routes: Routes = [
  { path: '', component: OrgaoComponent, resolve: { page: OrgaoResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgaoRoutingModule { }
