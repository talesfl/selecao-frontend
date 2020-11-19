import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import { CategoriaDocumento } from '../dominio/categoria-documento';
import { Subscription } from 'rxjs';

const ELEMENT_DATA: CategoriaDocumento[] = [
  { id: 1, nome: 'Hydrogen', descricao: 'H' },
  { id: 2, nome: 'Helium', descricao: 'He' },
];

@Component({
  selector: 'app-categoria-documento',
  templateUrl: './categoria-documento.component.html',
  styleUrls: ['./categoria-documento.component.scss']
})
export class CategoriaDocumentoComponent implements OnInit, OnDestroy {

  selected: CategoriaDocumento;
  formGroup: FormGroup;
  displayedColumns: string[] = ['id', 'nome', 'descricao'];

  dataSource = new MatTableDataSource<CategoriaDocumento>(ELEMENT_DATA);

  selection = new SelectionModel<CategoriaDocumento>(false, null, true);
  private selectionChangeSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder
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

  ngOnDestroy(): void {
    this.selectionChangeSubscription.unsubscribe();
  }

  private _subscribeToselectionChange(): Subscription {
    return this.selection.changed.subscribe((change: SelectionChange<CategoriaDocumento>) => {
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
    // TODO
  }

  public limpar(): void {
    this.formGroup.reset();
    this.selected = null;
    this.selection.clear();
  }
}
