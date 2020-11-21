import { MatTableDataSource } from '@angular/material/table';

import {
  Input,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Processo } from 'src/app/dominio/processo';
import { MovimentacaoProcesso } from 'src/app/dominio/movimentacao-processo';
import { MovimentacaoProcessoService } from 'src/app/service/movimento-processo.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMovimentarProcessoComponent } from './dialog-movimentar-processo/dialog-movimentar-processo.component';

@Component({
  selector: 'app-movimentacao-processo',
  templateUrl: './movimentacao-processo.component.html',
  styleUrls: ['./movimentacao-processo.component.scss']
})
export class MovimentacaoProcessoComponent implements OnChanges {

  @Input() processo: Processo;

  displayedColumns: string[] = [
    'id',
    'dataTramitacao',
    'orgaoOrigem',
    'orgaoDestino',
    'usuario'
  ];

  dataSource = new MatTableDataSource<MovimentacaoProcesso>([]);

  constructor(
    private matDialog: MatDialog,
    private movimentacaoProcessoService: MovimentacaoProcessoService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.processo?.currentValue) {
      this.updateDataSource();
    }
  }

  private updateDataSource(): void {
    if (this.processo) {
      this.movimentacaoProcessoService.findByProcessoId(this.processo.id)
        .subscribe((movimentacoes: MovimentacaoProcesso[]) => {
          this.dataSource.data = movimentacoes;
        });
    }
  }

  public movimentarProcesso(): void {
    const dialogRef = this.matDialog.open(DialogMovimentarProcessoComponent, {
      width: '600px',
      data: { processo: this.processo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateDataSource();
      }
    });
  }

}
