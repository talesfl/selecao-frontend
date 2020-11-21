import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';

import { Page } from 'src/app/dominio/page';
import { Orgao } from 'src/app/dominio/orgao';
import { Processo } from 'src/app/dominio/processo';

import { OrgaoService } from 'src/app/service/orgao.service';
import { MessageService } from 'src/app/service/message.service';
import { MovimentacaoProcessoService } from 'src/app/service/movimento-processo.service';


@Component({
  selector: 'app-dialog-movimentar-processo',
  templateUrl: './dialog-movimentar-processo.component.html',
  styleUrls: ['./dialog-movimentar-processo.component.scss']
})
export class DialogMovimentarProcessoComponent {

  processo: Processo;
  formGroup: FormGroup;

  filteredOrgaoOrigemOptions: Observable<Orgao[]>;
  filteredOrgaoDestinoOptions: Observable<Orgao[]>;

  constructor(
    private formBuilder: FormBuilder,
    private orgaoService: OrgaoService,
    private messageService: MessageService,
    private movimentacaoProcessoService: MovimentacaoProcessoService,
    private dialogRef: MatDialogRef<DialogMovimentarProcessoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { processo: Processo }
  ) {

    this.processo = this.data.processo;

    this.formGroup = this.formBuilder.group({
      orgaoOrigem: [null, Validators.required],
      orgaoDestino: [null, Validators.required],
      processo: [this.processo, Validators.required]
    });

    this.filteredOrgaoOrigemOptions = this.subscribeToOrgaoAutocomplete('orgaoOrigem');
    this.filteredOrgaoDestinoOptions = this.subscribeToOrgaoAutocomplete('orgaoDestino');
  }


  private subscribeToOrgaoAutocomplete(formGroupName: string): Observable<Orgao[]> {
    return this.formGroup.get(formGroupName)
      .valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nome),
        switchMap(nome => this.orgaoService.findByNomeStartingWith(nome)),
        map((page: Page<Orgao>) => page.content)
      );
  }

  public saveAndClose(): void {
    this.movimentacaoProcessoService.salvar(this.formGroup.getRawValue())
      .subscribe(
        () => this.dialogRef.close(true),
        () => {
          this.messageService.showMessage('Não foi possível movimentar o processo.');
          this.dialogRef.close(false);
        });
  }

  public displayOrgaoFn(orgao: Orgao): string {
    return orgao ? orgao.nome : '';
  }

}
