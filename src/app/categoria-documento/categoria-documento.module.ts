import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaDocumentoRoutingModule } from './categoria-documento-routing.module';
import { CategoriaDocumentoComponent } from './categoria-documento.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [CategoriaDocumentoComponent],
  imports: [
    CommonModule,
    CategoriaDocumentoRoutingModule,
    MaterialModule
  ]
})
export class CategoriaDocumentoModule { }
