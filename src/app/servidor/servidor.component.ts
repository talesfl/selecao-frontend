import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { Page } from '../dominio/page';

import { Servidor } from '../dominio/servidor';
import { ServidorService } from '../service/servidor.service';

@Component({
  selector: 'app-servidor',
  templateUrl: './servidor.component.html',
  styleUrls: ['./servidor.component.scss']
})
export class ServidorComponent implements AfterViewInit, OnDestroy {

  selected: Servidor;
  displayedColumns: string[] = ['matricula', 'orgao', 'cpf', 'nome'];

  dataSource = new MatTableDataSource<Servidor>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private pageChangeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private servidorService: ServidorService,
  ) { }

  ngAfterViewInit(): void {
    this.initDataFromResolver();
    this.pageChangeSubscription = this.subscribeToPageChangesEvent();
  }

  ngOnDestroy(): void {
    this.pageChangeSubscription.unsubscribe();
  }

  private subscribeToPageChangesEvent(): Subscription {
    return this.paginator.page.subscribe((event: PageEvent) => {
      this.servidorService.findByNomeStartingWith('', {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize
      });
    });
  }

  private initDataFromResolver(): void {
    if (this.activatedRoute.snapshot?.data?.page) {
      const page: Page<Servidor> = this.activatedRoute.snapshot.data.page;
      this.createDataSource(page);
    }
  }

  private createDataSource(page: Page<Servidor>): void {
    this.dataSource = new MatTableDataSource<Servidor>(page.content);
    this.dataSource.paginator = this.paginator;
  }

}
