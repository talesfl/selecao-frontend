import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServidorRoutingModule } from './servidor-routing.module';
import { ServidorComponent } from './servidor.component';
import { MaterialModule } from '../material/material.module';
import { ServidorService } from '../service/servidor.service';
import { ServidorResolver } from '../service/servidor.resolver';

@NgModule({
  declarations: [ServidorComponent],
  imports: [
    CommonModule,
    ServidorRoutingModule,
    MaterialModule
  ],
  providers: [
    ServidorService,
    ServidorResolver
  ]
})
export class ServidorModule { }
