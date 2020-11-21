import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Documento } from 'src/app/dominio/documento';

@Component({
  selector: 'app-dialog-vizualizar-documento',
  templateUrl: './dialog-vizualizar-documento.component.html',
  styleUrls: ['./dialog-vizualizar-documento.component.scss']
})
export class DialogVizualizarDocumentoComponent {

  documento: Documento;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { documento: Documento }
  ) {
    this.documento = this.data.documento;
  }

}
