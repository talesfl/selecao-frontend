import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServidorRoutingModule } from './servidor-routing.module';
import { ServidorComponent } from './servidor.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ServidorComponent],
  imports: [
    CommonModule,
    ServidorRoutingModule,
    MaterialModule
  ]
})
export class ServidorModule { }
