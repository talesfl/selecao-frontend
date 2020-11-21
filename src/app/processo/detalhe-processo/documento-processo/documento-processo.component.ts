import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CategoriaDocumento } from 'src/app/dominio/categoria-documento';
import { Documento } from 'src/app/dominio/documento';
import { Page } from 'src/app/dominio/page';
import { Processo } from 'src/app/dominio/processo';
import { CategoriaDocumentoService } from 'src/app/service/categoria-documento.service';
import { DocumentoService } from 'src/app/service/documento.service';
import { DialogSalvarDocumentoComponent } from './dialog-salvar-documento/dialog-salvar-documento.component';
import { DialogVizualizarDocumentoComponent } from './dialog-vizualizar-documento/dialog-vizualizar-documento.component';

@Component({
  selector: 'app-documento-processo',
  templateUrl: './documento-processo.component.html',
  styleUrls: ['./documento-processo.component.scss']
})
export class DocumentoProcessoComponent implements OnChanges {

  @Input() processo: Processo;
  mapaDocumentoObservable: { [key: string]: Observable<Documento[]> } = {};

  categorias: CategoriaDocumento[] = [];

  constructor(
    private categoriaDocumentoService: CategoriaDocumentoService,
    private documentoService: DocumentoService,
    private matDialog: MatDialog
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.processo?.currentValue) {
      this.initCategoriaDocumentos();
    }
  }

  public initCategoriaDocumentos(): void {
    this.categoriaDocumentoService
      .findByNomeStartingWith()
      .subscribe((page: Page<CategoriaDocumento>) => {
        this.categorias = page.content;
        this.categorias.forEach(categoria => {
          this.mapaDocumentoObservable[String(categoria.id)] = this.findByProcessoIdAndCategoriaId(categoria.id);
        });
      });
  }

  public adicionarDocumento(): void {
    const dialogRef = this.matDialog.open(DialogSalvarDocumentoComponent, {
      width: '600px',
      data: { processo: this.processo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.initCategoriaDocumentos();
      }
    });
  }

  public findByProcessoIdAndCategoriaId(categoriaId: number): Observable<Documento[]> {
    return this.documentoService.findByProcessoIdAndCategoriaId(this.processo.id, categoriaId);
  }

  public visualizarDocumento(event, documento: Documento): void {
    event.preventDefault();

    this.matDialog.open(DialogVizualizarDocumentoComponent, {
      width: '800px',
      height: '600px',
      data: { documento }
    });
  }

}
