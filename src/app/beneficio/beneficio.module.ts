import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BeneficioRoutingModule } from './beneficio-routing.module';
import { BeneficioComponent } from './beneficio.component';
import { MaterialModule } from '../material/material.module';
import { BeneficioService } from '../service/beneficio.service';
import { BeneficioResolver } from '../service/beneficio.resolver';
import { MessageService } from '../service/message.service';


@NgModule({
  declarations: [BeneficioComponent],
  imports: [
    CommonModule,
    BeneficioRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    BeneficioService,
    BeneficioResolver,
    MessageService
  ]
})
export class BeneficioModule { }
