import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share, takeUntil } from 'rxjs/operators';
import { CategoriaDocumento } from 'src/app/dominio/categoria-documento';
import { Documento } from 'src/app/dominio/documento';
import { Page } from 'src/app/dominio/page';
import { Processo } from 'src/app/dominio/processo';
import { CategoriaDocumentoService } from 'src/app/service/categoria-documento.service';
import { DocumentoService } from 'src/app/service/documento.service';

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
    private documentoService: DocumentoService
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

  }

  public findByProcessoIdAndCategoriaId(categoriaId: number): Observable<Documento[]> {
    return this.documentoService.findByProcessoIdAndCategoriaId(this.processo.id, categoriaId);
  }

  public visualizarDocumento(documentoId: number): void {

  }

}
