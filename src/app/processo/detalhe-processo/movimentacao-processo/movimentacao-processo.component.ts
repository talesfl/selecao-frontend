import { Component, Input, OnInit } from '@angular/core';
import { Processo } from 'src/app/dominio/processo';

@Component({
  selector: 'app-movimentacao-processo',
  templateUrl: './movimentacao-processo.component.html',
  styleUrls: ['./movimentacao-processo.component.scss']
})
export class MovimentacaoProcessoComponent implements OnInit {

  @Input() processo: Processo;

  constructor() { }

  ngOnInit(): void {
  }

}
