import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private processoService: ProcessoService
  ) { }

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

  private _subscribeToselectionChange(): Subscription {
    return this.selection.changed.subscribe((change: SelectionChange<Processo>) => {
      if (change.removed.includes(this.selected)) {
        this.selected = null;
      }

      if (!change.added.includes(this.selected)) {
        this.selected = change.added[0];
      }

    });
  }

  private subscribeToPageChangesEvent(): Subscription {
    return this.paginator.page.subscribe((event: PageEvent) => {
      this.processoService.findByNomeStartingWith('', {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize
      });
    });
  }

  private initDataFromResolver(): void {
    if (this.activatedRoute.snapshot?.data?.page) {
      const page: Page<Processo> = this.activatedRoute.snapshot.data.page;
      this.createDataSource(page);
    }
  }

  private createDataSource(page: Page<Processo>): void {
    this.dataSource = new MatTableDataSource<Processo>(page.content);
    this.dataSource.paginator = this.paginator;
  }

  public limpar(): void {
    this.selected = null;
    this.selection.clear();
  }

}
