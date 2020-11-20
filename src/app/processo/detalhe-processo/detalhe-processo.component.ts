import { Component, Input, OnInit } from '@angular/core';
import { Processo } from 'src/app/dominio/processo';

@Component({
  selector: 'app-detalhe-processo',
  templateUrl: './detalhe-processo.component.html',
  styleUrls: ['./detalhe-processo.component.scss']
})
export class DetalheProcessoComponent implements OnInit {

  @Input() processo: Processo;

  constructor() { }

  ngOnInit(): void {
  }

  public tabsDisabled(): boolean {
    return !this.processo;
  }

}
