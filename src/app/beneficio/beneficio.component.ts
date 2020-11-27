import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { Page } from '../dominio/page';
import { Beneficio } from '../dominio/beneficio';

import { BeneficioService } from '../service/beneficio.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-beneficio',
  templateUrl: './beneficio.component.html',
  styleUrls: ['./beneficio.component.scss']
})
export class BeneficioComponent implements OnInit, AfterViewInit, OnDestroy {

  selected: Beneficio;
  formGroup: FormGroup;
  displayedColumns: string[] = ['id', 'nome', 'descricao'];

  dataSource = new MatTableDataSource<Beneficio>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection = new SelectionModel<Beneficio>(false, null, true);
  private selectionChangeSubscription: Subscription;
  private pageChangeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private beneficioService: BeneficioService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef
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
    return this.paginator.page.pipe(
      switchMap((event: PageEvent) => this.beneficioService.findByNomeStartingWith('', {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize
      }))
    ).subscribe((page: Page<Beneficio>) => this.updateDataSource(page));
  }

  private initDataFromResolver(): void {
    if (this.activatedRoute.snapshot?.data?.page) {
      const page: Page<Beneficio> = this.activatedRoute.snapshot.data.page;
      this.updateDataSource(page);
    }
  }

  private updateDataSource(page: Page<Beneficio>): void {
    this.dataSource.data = page.content;
    this.paginator.pageIndex = page.number;
    this.paginator.length = page.totalElements;
    this.changeDetectorRef.detectChanges();
  }

  private _subscribeToselectionChange(): Subscription {
    return this.selection.changed.subscribe((change: SelectionChange<Beneficio>) => {
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
    let observable: Observable<Beneficio>;
    if (this.formGroup.get('id').value) {
      observable = this.beneficioService.atualizar(this.formGroup.getRawValue());
    } else {
      observable = this.beneficioService.salvar(this.formGroup.getRawValue());
    }

    observable.pipe(
      switchMap(() => this.beneficioService.findByNomeStartingWith())
    ).subscribe((page: Page<Beneficio>) => {
      this.updateDataSource(page);
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
