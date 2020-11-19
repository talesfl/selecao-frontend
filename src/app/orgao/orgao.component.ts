import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { Page } from '../dominio/page';
import { Orgao } from '../dominio/orgao';

import { OrgaoService } from '../service/orgao.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-orgao',
  templateUrl: './orgao.component.html',
  styleUrls: ['./orgao.component.scss']
})
export class OrgaoComponent implements OnInit, AfterViewInit, OnDestroy {

  selected: Orgao;
  formGroup: FormGroup;
  displayedColumns: string[] = ['id', 'nome', 'descricao'];

  dataSource = new MatTableDataSource<Orgao>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection = new SelectionModel<Orgao>(false, null, true);
  private selectionChangeSubscription: Subscription;
  private pageChangeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private orgaoService: OrgaoService,
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
      this.orgaoService.findByNomeStartingWith('', {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize
      });
    });
  }

  private initDataFromResolver(): void {
    if (this.activatedRoute.snapshot?.data?.page) {
      const page: Page<Orgao> = this.activatedRoute.snapshot.data.page;
      this.createDataSource(page);
    }
  }

  private createDataSource(page: Page<Orgao>): void {
    this.dataSource = new MatTableDataSource<Orgao>(page.content);
    this.dataSource.paginator = this.paginator;
  }

  private _subscribeToselectionChange(): Subscription {
    return this.selection.changed.subscribe((change: SelectionChange<Orgao>) => {
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
    let observable: Observable<Orgao>;
    if (this.formGroup.get('id').value) {
      observable = this.orgaoService.atualizar(this.formGroup.getRawValue());
    } else {
      observable = this.orgaoService.salvar(this.formGroup.getRawValue());
    }

    observable.pipe(
      switchMap(() => this.orgaoService.findByNomeStartingWith())
    ).subscribe((page: Page<Orgao>) => {
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
