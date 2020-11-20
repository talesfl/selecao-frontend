import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaDocumentoRoutingModule } from './categoria-documento-routing.module';
import { CategoriaDocumentoComponent } from './categoria-documento.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriaDocumentoService } from '../service/categoria-documento.service';
import { CategoriaDocumentoResolver } from '../service/categoria-documento.resolver';
import { MessageService } from '../service/message.service';

@NgModule({
  declarations: [CategoriaDocumentoComponent],
  imports: [
    CommonModule,
    CategoriaDocumentoRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoriaDocumentoService,
    CategoriaDocumentoResolver,
    MessageService
  ]
})
export class CategoriaDocumentoModule { }
