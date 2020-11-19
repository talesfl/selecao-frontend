import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaDocumentoRoutingModule } from './categoria-documento-routing.module';
import { CategoriaDocumentoComponent } from './categoria-documento.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoriaDocumentoComponent],
  imports: [
    CommonModule,
    CategoriaDocumentoRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CategoriaDocumentoModule { }
