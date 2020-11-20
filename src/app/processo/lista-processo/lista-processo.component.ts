import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Page } from 'src/app/dominio/page';
import { Processo } from 'src/app/dominio/processo';
import { ProcessoService } from 'src/app/service/processo.service';

@Component({
  selector: 'app-lista-processo',
  templateUrl: './lista-processo.component.html',
  styleUrls: ['./lista-processo.component.scss']
})
export class ListaProcessoComponent implements OnInit, AfterViewInit, OnDestroy {

  selected: Processo;
  displayedColumns: string[] = ['id', 'nome', 'dataCriacao'];

  dataSource = new MatTableDataSource<Processo>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection = new SelectionModel<Processo>(false, null, true);
  private selectionChangeSubscription: Subscription;
  private pageChangeSubscription: Subscription;

  @Output() processoSelectedChange = new EventEmitter<Processo>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private processoService: ProcessoService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.selectionChangeSubscription = this._subscribeToselectionChange();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.initDataFromResolver();
    this.pageChangeSubscription = this.subscribeToPageChangesEvent();
  }

  ngOnDestroy(): void {
    this.selectionChangeSubscription.unsubscribe();
    this.pageChangeSubscription.unsubscribe();
  }

  private _subscribeToselectionChange(): Subscription {
    return this.selection.changed.subscribe((change: SelectionChange<Processo>) => {
      if (change.removed.includes(this.selected)) {
        this.selected = null;
      }

      if (!change.added.includes(this.selected)) {
        this.selected = change.added[0];
      }

      this.processoSelectedChange.emit(this.selected);
    });
  }

  private subscribeToPageChangesEvent(): Subscription {
    return this.paginator.page.pipe(
      switchMap((event: PageEvent) => this.processoService.findByNomeStartingWith('', {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize
      }))
    ).subscribe((page: Page<Processo>) => this.updateDataSource(page));
  }

  private initDataFromResolver(): void {
    if (this.activatedRoute.snapshot?.data?.page) {
      const page: Page<Processo> = this.activatedRoute.snapshot.data.page;
      this.updateDataSource(page);
    }
  }

  private updateDataSource(page: Page<Processo>): void {
    this.dataSource.data = page.content;
    this.paginator.pageIndex = page.number;
    this.paginator.length = page.totalElements;
    this.changeDetectorRef.detectChanges();
  }

  public limpar(): void {
    this.selected = null;
    this.selection.clear();
    this.processoSelectedChange.emit(this.selected);
  }

  public resetLista(): void {
    this.processoService.findByNomeStartingWith()
      .subscribe((page: Page<Processo>) => {
        this.updateDataSource(page);
        this.limpar();
      });
  }


}
