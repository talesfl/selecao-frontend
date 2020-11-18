import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BeneficioRoutingModule } from './beneficio-routing.module';
import { BeneficioComponent } from './beneficio.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [BeneficioComponent],
  imports: [
    CommonModule,
    BeneficioRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class BeneficioModule { }
