import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';

import { Page } from 'src/app/dominio/page';
import { CategoriaDocumento } from 'src/app/dominio/categoria-documento';

import { DocumentoService } from 'src/app/service/documento.service';
import { CategoriaDocumentoService } from 'src/app/service/categoria-documento.service';
import { MessageService } from 'src/app/service/message.service';
import { Processo } from 'src/app/dominio/processo';

@Component({
  selector: 'app-dialog-salvar-documento',
  templateUrl: './dialog-salvar-documento.component.html',
  styleUrls: ['./dialog-salvar-documento.component.scss']
})
export class DialogSalvarDocumentoComponent implements OnInit {

  multiparFile: File;
  formGroup: FormGroup;
  filteredCategoriaOptions: Observable<CategoriaDocumento[]>;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private documentoService: DocumentoService,
    private categoriaDocumentoService: CategoriaDocumentoService,
    private dialogRef: MatDialogRef<DialogSalvarDocumentoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { processo: Processo }
  ) {
    this.formGroup = this.formBuilder.group({
      nome: [null, Validators.required],
      categoria: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscribeToCategproaAutocomplete();
  }

  private subscribeToCategproaAutocomplete(): void {
    this.filteredCategoriaOptions = this.formGroup.get('categoria')
      .valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nome),
        switchMap(nome => this.categoriaDocumentoService.findByNomeStartingWith(nome)),
        map((page: Page<CategoriaDocumento>) => page.content)
      );
  }

  public displayCategoriaFn(categoria: CategoriaDocumento): string {
    return categoria ? categoria.nome : '';
  }

  public saveAndClose(): void {

    this.documentoService.salvar(
      this.multiparFile,
      this.formGroup.get('categoria').value.id,
      this.data.processo.id
    ).subscribe(() => {
      this.dialogRef.close(true);
    }, () => {
      this.messageService.showMessage('Não foi possível salvar/atualizar o registro.');
      this.dialogRef.close(false);
    });
  }

  public onFileChange(event): void {
    const fileList = event.target.files;
    if (fileList.length > 0) {
      this.multiparFile = fileList[0];
    }
  }

}
