import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessoRoutingModule } from './processo-routing.module';
import { ProcessoComponent } from './processo.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [ProcessoComponent],
  imports: [
    CommonModule,
    ProcessoRoutingModule,
    MaterialModule
  ]
})
export class ProcessoModule { }
