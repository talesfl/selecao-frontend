import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Servidor } from '../dominio/servidor';

const ELEMENT_DATA: Servidor[] = [
  { matricula: 1, orgao: 1, cpf: 11111111111, nome: 'Servidor 1' },
  { matricula: 2, orgao: 2, cpf: 22222222222, nome: 'Servidor 2' },
  { matricula: 3, orgao: 3, cpf: 33333333333, nome: 'Servidor 3' },
];

@Component({
  selector: 'app-servidor',
  templateUrl: './servidor.component.html',
  styleUrls: ['./servidor.component.scss']
})
export class ServidorComponent implements OnInit {

  selected: Servidor;
  displayedColumns: string[] = ['matricula', 'orgao', 'cpf', 'nome'];

  dataSource = new MatTableDataSource<Servidor>(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

}
