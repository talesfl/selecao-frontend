import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Beneficio } from 'src/app/dominio/beneficio';
import { Page } from 'src/app/dominio/page';
import { Processo } from 'src/app/dominio/processo';
import { Servidor } from 'src/app/dominio/servidor';
import { BeneficioService } from 'src/app/service/beneficio.service';
import { MessageService } from 'src/app/service/message.service';
import { ProcessoService } from 'src/app/service/processo.service';
import { ServidorService } from 'src/app/service/servidor.service';

@Component({
  selector: 'app-dialog-novo-processo',
  templateUrl: './dialog-novo-processo.component.html',
  styleUrls: ['./dialog-novo-processo.component.scss']
})
export class DialogNovoProcessoComponent implements OnInit {

  formGroup: FormGroup;

  filteredServidorOptions: Observable<Servidor[]>;
  filteredBeneficioOptions: Observable<Beneficio[]>;

  constructor(
    private formBuilder: FormBuilder,
    private processoService: ProcessoService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DialogNovoProcessoComponent>,
    private servidorService: ServidorService,
    private beneficioService: BeneficioService
  ) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      descricao: [null, Validators.required],
      servidor: [null, Validators.required],
      beneficio: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscribeToServidorAutocomplete();
    this.subscribeToBeneficioAutocomplete();
  }

  private subscribeToBeneficioAutocomplete(): void {
    this.filteredBeneficioOptions = this.formGroup.get('beneficio')
      .valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nome),
        switchMap(nome => this.beneficioService.findByNomeStartingWith(nome)),
        map((page: Page<Beneficio>) => page.content)
      );
  }

  private subscribeToServidorAutocomplete(): void {
    this.filteredServidorOptions = this.formGroup.get('servidor')
      .valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nome),
        switchMap(nome => this.servidorService.findByNomeStartingWith(nome)),
        map((page: Page<Servidor>) => page.content)
      );
  }

  public saveAndClose(): void {
    const processo: Processo = new Processo(this.formGroup.getRawValue());

    this.processoService.salvar(processo)
      .subscribe(() => {
        this.dialogRef.close(true);
      }, () => {
        this.messageService.showMessage('Não foi possível salvar/atualizar o registro.');
        this.dialogRef.close(false);
      });
  }

  public displayServidorFn(servidor: Servidor): string {
    return servidor ? servidor.nome : '';
  }

  public displayBeneficioFn(beneficio: Beneficio): string {
    return beneficio ? beneficio.nome : '';
  }
}
