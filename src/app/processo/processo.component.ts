import { Component, OnInit } from '@angular/core';
import { Processo } from '../dominio/processo';

@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.scss']
})
export class ProcessoComponent implements OnInit {

  selected: Processo;

  constructor() { }

  ngOnInit(): void {
  }

  public novoProcesso(): void {}

  public movimentarProcesso(): void {}

  public buttonMovimentarProcesssoDisabled(): boolean {
    return !this.selected;
  }
}
