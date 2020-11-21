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
import { DialogNovoProcessoComponent } from './dialog-novo-processo/dialog-novo-processo.component';
import { MessageService } from '../service/message.service';
import { BeneficioService } from '../service/beneficio.service';
import { ServidorService } from '../service/servidor.service';
import { DocumentoProcessoComponent } from './detalhe-processo/documento-processo/documento-processo.component';
import { MovimentacaoProcessoComponent } from './detalhe-processo/movimentacao-processo/movimentacao-processo.component';
import { CategoriaDocumentoService } from '../service/categoria-documento.service';
import { DocumentoService } from '../service/documento.service';
import { DialogSalvarDocumentoComponent } from './detalhe-processo/documento-processo/dialog-salvar-documento/dialog-salvar-documento.component';
import { DialogVizualizarDocumentoComponent } from './detalhe-processo/documento-processo/dialog-vizualizar-documento/dialog-vizualizar-documento.component';
import { SanitizerPipe } from '../pipe/sanitezer.pipe';
import { MovimentacaoProcessoService } from '../service/movimento-processo.service';
import { DialogMovimentarProcessoComponent } from './detalhe-processo/movimentacao-processo/dialog-movimentar-processo/dialog-movimentar-processo.component';
import { OrgaoService } from '../service/orgao.service';


@NgModule({
  declarations: [
    ProcessoComponent,
    ListaProcessoComponent,
    DetalheProcessoComponent,
    DialogNovoProcessoComponent,
    DocumentoProcessoComponent,
    MovimentacaoProcessoComponent,
    DialogSalvarDocumentoComponent,
    DialogVizualizarDocumentoComponent,
    SanitizerPipe,
    DialogMovimentarProcessoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProcessoRoutingModule,
    MaterialModule,
  ],
  providers: [
    ProcessoService,
    ProcessoResolver,
    MessageService,
    BeneficioService,
    ServidorService,
    CategoriaDocumentoService,
    DocumentoService,
    MovimentacaoProcessoService,
    OrgaoService
  ],
})
export class ProcessoModule { }
