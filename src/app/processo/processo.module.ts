import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { ProcessoRoutingModule } from './processo-routing.module';

import { ProcessoComponent } from './processo.component';
import { ListaProcessoComponent } from './lista-processo/lista-processo.component';
import { DetalheProcessoComponent } from './detalhe-processo/detalhe-processo.component';

import { ProcessoService } from '../service/processo.service';
import { ProcessoResolver } from '../service/processo.resolver';


@NgModule({
  declarations: [
    ProcessoComponent,
    ListaProcessoComponent,
    DetalheProcessoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProcessoRoutingModule,
    MaterialModule,
  ],
  providers: [
    ProcessoService,
    ProcessoResolver
  ]
})
export class ProcessoModule { }
