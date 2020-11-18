import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrgaoComponent } from './orgao.component';

const routes: Routes = [{ path: '', component: OrgaoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgaoRoutingModule { }
