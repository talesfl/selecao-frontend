import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { OrgaoRoutingModule } from './orgao-routing.module';
import { OrgaoComponent } from './orgao.component';

import { OrgaoResolver } from '../service/orgao.resolver';
import { OrgaoService } from '../service/orgao.service';
import { MessageService } from '../service/message.service';

@NgModule({
  declarations: [OrgaoComponent],
  imports: [
    OrgaoRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    OrgaoService,
    OrgaoResolver,
    MessageService
  ]
})
export class OrgaoModule { }
