import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Processo } from '../dominio/processo';
import { DialogNovoProcessoComponent } from './dialog-novo-processo/dialog-novo-processo.component';
import { ListaProcessoComponent } from './lista-processo/lista-processo.component';

@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.scss']
})
export class ProcessoComponent implements OnInit {


  @ViewChild(ListaProcessoComponent) listaProcesso: ListaProcessoComponent;

  selected: Processo;

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public novoProcesso(): void {
    const dialogRef = this.matDialog.open(DialogNovoProcessoComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listaProcesso.resetLista();
      }
    });
  }
}
