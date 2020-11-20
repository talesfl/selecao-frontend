import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { Page } from '../dominio/page';
import { CategoriaDocumento } from '../dominio/categoria-documento';

import { CategoriaDocumentoService } from '../service/categoria-documento.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-categoria-documento',
  templateUrl: './categoria-documento.component.html',
  styleUrls: ['./categoria-documento.component.scss']
})
export class CategoriaDocumentoComponent implements OnInit, AfterViewInit, OnDestroy {

  selected: CategoriaDocumento;
  formGroup: FormGroup;
  displayedColumns: string[] = ['id', 'nome', 'descricao'];

  dataSource = new MatTableDataSource<CategoriaDocumento>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection = new SelectionModel<CategoriaDocumento>(false, null, true);
  private selectionChangeSubscription: Subscription;
  private pageChangeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoriaDocumentoService: CategoriaDocumentoService,
    private messageService: MessageService
  ) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: [null],
      descricao: [null],
    });

  }

  ngOnInit(): void {
    this.selectionChangeSubscription = this._subscribeToselectionChange();
  }

  ngAfterViewInit(): void {
    this.initDataFromResolver();
    this.pageChangeSubscription = this.subscribeToPageChangesEvent();
  }

  ngOnDestroy(): void {
    this.selectionChangeSubscription.unsubscribe();
    this.pageChangeSubscription.unsubscribe();
  }

  private subscribeToPageChangesEvent(): Subscription {
    return this.paginator.page.subscribe((event: PageEvent) => {
      this.categoriaDocumentoService.findByNomeStartingWith('', {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize
      });
    });
  }

  private initDataFromResolver(): void {
    if (this.activatedRoute.snapshot?.data?.page) {
      const page: Page<CategoriaDocumento> = this.activatedRoute.snapshot.data.page;
      this.createDataSource(page);
    }
  }

  private createDataSource(page: Page<CategoriaDocumento>): void {
    this.dataSource = new MatTableDataSource<CategoriaDocumento>(page.content);
    this.dataSource.paginator = this.paginator;
  }

  private _subscribeToselectionChange(): Subscription {
    return this.selection.changed.subscribe((change: SelectionChange<CategoriaDocumento>) => {
      if (change.removed.includes(this.selected)) {
        this.selected = null;
      }

      if (!change.added.includes(this.selected)) {
        this.selected = change.added[0];
      }

      this._patchValueIfSelectedOrReset();
    });
  }

  private _patchValueIfSelectedOrReset(): void {
    if (this.selected) {
      this.formGroup.patchValue(this.selected);
    } else {
      this.formGroup.reset();
    }
  }

  public salvarOuAtualizar(): void {
    let observable: Observable<CategoriaDocumento>;
    if (this.formGroup.get('id').value) {
      observable = this.categoriaDocumentoService.atualizar(this.formGroup.getRawValue());
    } else {
      observable = this.categoriaDocumentoService.salvar(this.formGroup.getRawValue());
    }

    observable.pipe(
      switchMap(() => this.categoriaDocumentoService.findByNomeStartingWith())
    ).subscribe((page: Page<CategoriaDocumento>) => {
      this.createDataSource(page);
      this.limpar();
    },
      () => {
        this.messageService.showMessage('Não foi possível salvar/atualizar o registro.');
      });
  }

  public limpar(): void {
    this.formGroup.reset();
    this.selected = null;
    this.selection.clear();
  }

}
