import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgaoRoutingModule } from './orgao-routing.module';
import { OrgaoComponent } from './orgao.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [OrgaoComponent],
  imports: [
    CommonModule,
    OrgaoRoutingModule,
    MaterialModule
  ]
})
export class OrgaoModule { }
