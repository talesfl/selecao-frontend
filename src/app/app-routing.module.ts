import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'processo',
    loadChildren: () => import('./processo/processo.module').then(m => m.ProcessoModule)
  },
  {
    path: 'orgao',
    loadChildren: () => import('./orgao/orgao.module').then(m => m.OrgaoModule)
  },
  {
    path: 'beneficio',
    loadChildren: () => import('./beneficio/beneficio.module').then(m => m.BeneficioModule)
  },
  {
    path: 'categoria-documento',
    loadChildren: () => import('./categoria-documento/categoria-documento.module').then(m => m.CategoriaDocumentoModule)
  },
  {
    path: 'servidor',
    loadChildren: () => import('./servidor/servidor.module').then(m => m.ServidorModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
